from Utils.API_Client import APIClient
from Utils.EndPoints import EndPoints


def test_get_accounts():

    response = APIClient.get(
        EndPoints.ACCOUNTS
    )

    print(response.text)

    assert response.status_code == 200
    