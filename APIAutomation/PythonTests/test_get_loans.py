from Utils.API_Client import APIClient
from Utils.EndPoints import EndPoints


def test_get_loans():

    response = APIClient.get(
        EndPoints.LOANS
    )

    print(response.text)

    assert response.status_code == 200