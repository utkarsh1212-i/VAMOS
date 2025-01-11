const apiUrls = {
    // # Auth URLs
    "LOGIN": "/api/auth/signin",
    "LOGOUT": "/api/auth/logout",
    "SIGNUP": "/api/auth/signup",
    "RESET_PASSWORD": "/api/auth/reset-password",
    "FORGOT_PASSWORD": "/api/auth/forgot-password",
    "GET_ACCESS_TOKEN": "/api/auth/refresh-tokens",
    
    // Auth URLs
    "GET_USER_PROFILE": "/api/v1/users/profile/",
    "UPDATE_USER": "/api/user/update",
    "DELETE_USER": "/api/user/delete",
    "FETCH_DASHBOARD": "/api/dashboard/fetch",
    "FETCH_NOTIFICATIONS": "/api/notifications/fetch",
    "MARK_NOTIFICATION_READ": "/api/notifications/mark-read"
  }

  export { apiUrls}
  