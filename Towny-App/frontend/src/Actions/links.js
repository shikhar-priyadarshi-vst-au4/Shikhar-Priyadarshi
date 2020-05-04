export const HOST = process.env.REACT_APP_HOST_NAME;
export const PORT = process.env.REACT_APP_API_PORT;

export const worker_links = [
    { register : "/worker/register" },
    { login : "/worker/login" },
    { upload:"/worker/upload?jwt=" },
    { tokenAuth : "/worker/auth?jwt="},
    { render : "/services/render?category="},
    { register : "/services/register?jwt="},
    { acceptTicket : `/ticket/action/:profile_id/
    :customer_id/:booking_id/:action`}
]

export const client_links = [
    { Register : "/user/register"},
    { Login : "/user/login"},
    { Upload : "/user/upload?jwt="},
    { tokenAuth : "/user/auth?jwt="},
    { createBooking : "/user/create/"},
    { getBookings : "/user/retrieve/"},
    { cancelBooking : "/user/cancel/:bookingId" },
    { workerAssigned : "/user/assign/" },
    { submitFeedback : "/user/submit/feedback/:profile_id" },

]