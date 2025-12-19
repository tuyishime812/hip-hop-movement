import requests
import time

def test_backend():
    """Test if the backend is running and accessible"""
    base_url = "http://localhost:8000"
    
    print("Testing backend connection...")
    
    # Test health endpoint
    try:
        response = requests.get(f"{base_url}/health")
        if response.status_code == 200:
            print("✓ Backend health check: SUCCESS")
            print(f"  Response: {response.json()}")
        else:
            print(f"✗ Backend health check: FAILED - Status {response.status_code}")
    except requests.exceptions.ConnectionError:
        print("✗ Backend health check: FAILED - Connection Error")
        print("  The backend server might not be running.")
        print("  Please start the backend with: cd backend && python run_app.py")
        return False
    except Exception as e:
        print(f"✗ Backend health check: FAILED - {str(e)}")
        return False
    
    # Test API endpoints
    endpoints = [
        "/api/artists/",
        "/api/events/",
        "/api/donations/",
        "/api/contact/"
    ]
    
    print("\nTesting API endpoints...")
    for endpoint in endpoints:
        try:
            response = requests.get(f"{base_url}{endpoint}")
            if response.status_code in [200, 405]:  # 200 for GET, 405 for method not allowed but endpoint exists
                print(f"✓ {endpoint}: SUCCESS")
            else:
                print(f"✗ {endpoint}: FAILED - Status {response.status_code}")
        except Exception as e:
            print(f"✗ {endpoint}: FAILED - {str(e)}")
    
    return True

if __name__ == "__main__":
    test_backend()