async function buildNotificationsForRole(role) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': 'Bearer ' + token } : {})
    };

    if (!token || !userId) {
        return [];
    }

    try {
        if (role === 'PATIENT') {
            const res = await fetch(`http://localhost:8083/api/appointments/patient/${userId}`, { headers });
            if (!res.ok) throw new Error();
            const items = await res.json();
            return items
                .sort((a, b) => new Date(b.appointmentTime || 0) - new Date(a.appointmentTime || 0))
                .slice(0, 6)
                .map(item => ({
                    icon: item.status === 'CONFIRMED' ? 'fa-circle-check' : item.status === 'REJECTED' ? 'fa-circle-xmark' : 'fa-hourglass-half',
                    title: item.status === 'CONFIRMED' ? 'Appointment confirmed' : item.status === 'REJECTED' ? 'Appointment update' : 'Appointment request pending',
                    body: `Your appointment with Doctor ${item.doctorId ?? '-'} is currently ${formatNotificationStatus(item.status)}.`,
                    time: formatNotificationTime(item.appointmentTime)
                }));
        }

        if (role === 'DOCTOR') {
            const res = await fetch(`http://localhost:8083/api/appointments/doctor/${userId}`, { headers });
            if (!res.ok) throw new Error();
            const items = await res.json();
            return items
                .filter(item => item.status === 'PENDING' || item.status === 'CONFIRMED')
                .sort((a, b) => new Date(b.appointmentTime || 0) - new Date(a.appointmentTime || 0))
                .slice(0, 6)
                .map(item => ({
                    icon: item.status === 'PENDING' ? 'fa-user-clock' : 'fa-stethoscope',
                    title: item.status === 'PENDING' ? 'Pending consultation review' : 'Confirmed consultation',
                    body: `Appointment for patient #${item.patientId ?? '-'} is ${formatNotificationStatus(item.status)}.`,
                    time: formatNotificationTime(item.appointmentTime)
                }));
        }

        if (role === 'ADMIN') {
            const res = await fetch('http://localhost:8083/api/appointments/all', { headers });
            if (!res.ok) throw new Error();
            const items = await res.json();
            return items
                .sort((a, b) => new Date(b.appointmentTime || 0) - new Date(a.appointmentTime || 0))
                .slice(0, 8)
                .map(item => ({
                    icon: item.status === 'PENDING' ? 'fa-shield-heart' : item.status === 'CONFIRMED' ? 'fa-circle-check' : 'fa-clipboard-list',
                    title: item.status === 'PENDING' ? 'Approval needed' : 'Appointment activity',
                    body: `Patient #${item.patientId ?? '-'} with doctor #${item.doctorId ?? '-'} is ${formatNotificationStatus(item.status)}.`,
                    time: formatNotificationTime(item.appointmentTime)
                }));
        }
    } catch (_) {
        return [
            {
                icon: 'fa-bell',
                title: 'Notification center unavailable',
                body: 'We could not load live notifications right now. Please try again shortly.',
                time: 'Just now'
            }
        ];
    }

    return [];
}

function formatNotificationStatus(status) {
    if (status === 'CONFIRMED') return 'confirmed';
    if (status === 'PENDING') return 'pending';
    if (status === 'REJECTED') return 'rejected';
    return (status || 'updated').toLowerCase();
}

function formatNotificationTime(value) {
    if (!value) return 'Recently';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Recently';
    return date.toLocaleString('en-IN', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function renderNotificationPanel(root, notifications) {
    const list = root.querySelector('[data-notification-list]');
    const count = root.querySelector('[data-notification-count]');
    const summary = root.querySelector('[data-notification-summary]');

    count.textContent = notifications.length;
    summary.textContent = notifications.length ? `${notifications.length} new updates` : 'All caught up';

    if (!notifications.length) {
        list.innerHTML = `
            <div class="notification-empty">
                <i class="fas fa-bell-slash"></i>
                <p>No notifications right now.</p>
            </div>
        `;
        return;
    }

    list.innerHTML = notifications.map(item => `
        <div class="notification-item">
            <div class="notification-icon"><i class="fas ${item.icon}"></i></div>
            <div class="notification-content">
                <strong>${item.title}</strong>
                <p>${item.body}</p>
                <span>${item.time}</span>
            </div>
        </div>
    `).join('');
}

async function initNotificationCenter() {
    const bells = document.querySelectorAll('[data-notification-bell]');
    if (!bells.length) return;

    document.addEventListener('click', event => {
        if (!event.target.closest('.notification-wrap')) {
            document.querySelectorAll('[data-notification-panel]').forEach(panel => panel.classList.remove('visible'));
        }
    });

    for (const bell of bells) {
        const wrap = bell.closest('.notification-wrap');
        const panel = wrap.querySelector('[data-notification-panel]');
        const role = bell.getAttribute('data-notification-role');

        const notifications = await buildNotificationsForRole(role);
        renderNotificationPanel(wrap, notifications);

        bell.addEventListener('click', async () => {
            document.querySelectorAll('[data-notification-panel]').forEach(other => {
                if (other !== panel) other.classList.remove('visible');
            });

            const latest = await buildNotificationsForRole(role);
            renderNotificationPanel(wrap, latest);
            panel.classList.toggle('visible');
        });
    }
}

document.addEventListener('DOMContentLoaded', initNotificationCenter);
