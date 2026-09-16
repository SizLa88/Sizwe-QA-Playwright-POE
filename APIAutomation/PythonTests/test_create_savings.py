from Utils.API_Client import APIClient
from Utils.EndPoints import EndPoints


def test_create_savings():

    payload = {
        "accountType": "Savings",
        "name": "SizSavings"
    }

    response = APIClient.post(
        EndPoints.SAVINGS,
        payload
    )

    print(response.text)

    assert response.status_code in [200, 201]