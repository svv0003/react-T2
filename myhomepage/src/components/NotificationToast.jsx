import React from 'react';
import { useToast } from '../context/ToastProvider';
import {useNavigate} from "react-router-dom";

const NotificationToast = () => {
    const { notifications, removeNotification } = useToast();

    const navigate = useNavigate();
    const handleNotificationClick = (notification) =>{
    /*
    * 과제
    * 상세보기 떴을 때, 상세보기로 이동하면 게시물이 보이지않는 현상 발생
    * 해결하여 상세보기를 클릭했을 때, 게시글이 보일 수 있도록 기능 구현
    */
        // console.log 로 boardId 확인하고 notificationcontroller 와 toast 수정하기
        // 게시물 ID가 있으면 해당 게시물로 이동
        if(notification.boardId) {
            navigate(`/boards/${notification.boardId}`);
            removeNotification(notification.id); // 게시물 로 이동할 경우 알림 읽음 형태로 지우기
        }
    }
    return (
        <div className="notification-container">
            {notifications.map((notification) => (
                <div key={notification.id} className="notification-toast">
                    <div className="notification-content">
                        <div className="notification-icon">🔔</div>
                        <div className="notification-text">
                            <h4>{notification.msg}</h4>
                            {notification.title && <p>제목: {notification.title}</p>}
                            {notification.writer && <p>작성자: {notification.writer}</p>}
                            {notification.boardId &&<button className="notification-goto=btn"
                            onClick={() => handleNotificationClick(notification)}>
                                상세보기
                            </button>}
                        </div>
                        <button className="notification-close"
                                onClick={() => removeNotification(notification.id)}
                                aria-label="close">
                            x
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NotificationToast;


