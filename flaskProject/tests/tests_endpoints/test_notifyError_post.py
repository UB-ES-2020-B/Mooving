from tests.tests_endpoints.config_tests import *


def test_error_notify_correct(client):
    c = client

    path = '/notifyError/1'

    r = c.post(path)
    assert r.status_code == 201


def test_error_notify_error1(client): # No se encuentra la moto pasada por url
    c = client

    path = '/notifyError/9999'

    r = c.post(path)
    assert r.status_code == 404
