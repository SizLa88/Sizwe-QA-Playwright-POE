import requests


class APIClient:

    @staticmethod
    def post(url, payload, headers=None):

        return requests.post(
            url,
            json=payload,
            headers=headers
        )

    @staticmethod
    def get(url, headers=None):

        return requests.get(
            url,
            headers=headers
        )