import http.server
import socketserver
import threading
import time
import urllib.request
import json

def check_backend_endpoints():
    """Test the backend endpoints to see if they are properly configured"""
    base_url = "http://localhost:8000"
    
    endpoints = [
        "/",
        "/health",
        "/api/events/",
        "/api/artists/",
        "/api/donations/",
        "/api/contact/"
    ]
    
    print("Testing backend endpoints...")
    
    for endpoint in endpoints:
        try:
            response = urllib.request.urlopen(base_url + endpoint)
            if response.getcode() == 200 or response.getcode() == 405:  # 405 means endpoint exists but wrong method
                print(f"✓ {endpoint}: {response.getcode()}")
            else:
                print(f"✗ {endpoint}: {response.getcode()}")
        except Exception as e:
            print(f"✗ {endpoint}: Error - {str(e)}")

if __name__ == "__main__":
    check_backend_endpoints()