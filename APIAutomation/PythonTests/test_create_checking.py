from Utils.API_Client import APIClient
from Utils.EndPoints import EndPoints


def test_create_checking():

    payload = {
        "accountType": "Checking",
        "name": "SizChecking"
    }

    response = APIClient.post(
        EndPoints.CHECKING,
        payload
    )

    print(response.text)

    assert response.status_code in [200, 201]