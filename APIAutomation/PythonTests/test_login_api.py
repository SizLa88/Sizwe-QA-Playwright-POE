from Utils.API_Client import APIClient
from Utils.EndPoints import EndPoints


def test_login():

    payload = {
        "username": "SizBankTest",
        "password": "Test@123"
    }

    response = APIClient.post(
        EndPoints.LOGIN,
        payload
    )

    print(response.status_code)
    print(response.text)

    assert response.status_code == 200