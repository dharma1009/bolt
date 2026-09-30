# from django.urls import path

# from .views import (
#     RegisterView,
#     RecognizeUserView,
#     VerifyCodeView,
#     CheckoutView,
# )

# urlpatterns = [
#     path("register/", RegisterView.as_view(), name="register"),
#     path("recognize/", RecognizeUserView.as_view(), name="recognize"),
#     path("verify-code/", VerifyCodeView.as_view(), name="verify-code"),
#     path("checkout/", CheckoutView.as_view(), name="checkout"),
# ]

from django.urls import path

from .views import (
    RegisterView,
    RecognizeUserView,
    VerifyCodeView,
)

urlpatterns = [
    path(
        "register/",
        RegisterView.as_view(),
        name="register",
    ),

    path(
        "recognize/",
        RecognizeUserView.as_view(),
        name="recognize",
    ),

    path(
        "verify-code/",
        VerifyCodeView.as_view(),
        name="verify-code",
    ),
]