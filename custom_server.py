import http.server
import socketserver
import os
import urllib.parse

PORT = 8000

class FestivalHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL path
        parsed_path = urllib.parse.urlparse(self.path)
        path = parsed_path.path
        
        # Define the special routes that should be redirected to index.html
        special_routes = ['/encomenda', '/localizacao', '/eventos', '/galeria', '/destaques']
        
        # If the path is in our special routes or doesn't exist as a file
        if path in special_routes or not os.path.exists(os.path.join(os.getcwd(), path.lstrip('/'))):
            # Preserve the original path for client-side routing
            self.path = '/'
        
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

if __name__ == "__main__":
    handler = FestivalHandler
    
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print(f"Serving at http://localhost:{PORT}")
        print(f"Special routes: /encomenda, /localizacao, /eventos, /galeria, /destaques")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
            httpd.shutdown()