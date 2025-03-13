# NexChat
authRouter
-post/signup
-post/login
-post/logout

profileRouter
-get/profile/view
-patch/profile/edit
-patch/profile/password

connectionRequestRouter
-patch/request/send/:status/:userId
-post/requested/review/:status/:requestId


userRouter
-get/user/connections
-get/user/requests/received
-get/user/feed-gets you the profile of other users on platform

