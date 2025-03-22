from http.server import HTTPServer, BaseHTTPRequestHandler
import json
from datetime import datetime
import webbrowser
import os

class HerbHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        routes = {
            '/': self.serve_home,
            '/get_herb_schedule': self.handle_herb_schedule,
            '/get_current_herb': self.handle_current_herb
        }

        # Serve static files
        if self.path.endswith(('.html', '.css', '.js', '.png', '.jpg', '.webp', '.json')):
            self.serve_static_file()
            return

        # Handle API routes
        handler = routes.get(self.path)
        if handler:
            handler()
        else:
            self.send_error(404, "Route not found")

    def serve_home(self):
        self.serve_static_file('home.html')

    def serve_static_file(self, override_path=None):
        try:
            file_to_open = override_path if override_path else self.path[1:] if self.path.startswith('/') else self.path
            with open(file_to_open, 'rb') as file:
                self.send_response(200)
                if file_to_open.endswith('.css'):
                    self.send_header('Content-type', 'text/css')
                elif file_to_open.endswith('.js'):
                    self.send_header('Content-type', 'application/javascript')
                elif file_to_open.endswith('.html'):
                    self.send_header('Content-type', 'text/html')
                elif file_to_open.endswith('.json'):
                    self.send_header('Content-type', 'application/json')
                elif file_to_open.endswith(('.jpg', '.jpeg')):
                    self.send_header('Content-type', 'image/jpeg')
                elif file_to_open.endswith('.png'):
                    self.send_header('Content-type', 'image/png')
                elif file_to_open.endswith('.webp'):
                    self.send_header('Content-type', 'image/webp')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(file.read())
        except FileNotFoundError:
            self.send_error(404, 'File Not Found: %s' % self.path)

    def handle_herb_schedule(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        # Get the current day's herb based on the week's schedule
        current_day = datetime.now().weekday()  # 0 = Monday, 6 = Sunday
        days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        herbs = [
            {
                "day": "Monday",
                "name": "Tulsi (Holy Basil)",
                "dosage": "2-3 times daily",
                "time": "After meals"
            },
            {
                "day": "Tuesday",
                "name": "Ginger",
                "dosage": "1-2 cups daily",
                "time": "Before meals"
            },
            {
                "day": "Wednesday",
                "name": "Neem",
                "dosage": "1-2 times daily",
                "time": "Morning and evening"
            },
            {
                "day": "Thursday",
                "name": "Mint",
                "dosage": "2-3 times daily",
                "time": "Between meals"
            },
            {
                "day": "Friday",
                "name": "Cinnamon",
                "dosage": "1-2 times daily",
                "time": "Morning"
            },
            {
                "day": "Saturday",
                "name": "Turmeric",
                "dosage": "2 times daily",
                "time": "Morning and night"
            },
            {
                "day": "Sunday",
                "name": "Cardamom",
                "dosage": "1-2 times daily",
                "time": "After breakfast"
            }
        ]
        
        self.wfile.write(json.dumps(herbs).encode())

    def handle_current_herb(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        # Get the current day's herb based on the week's schedule
        current_day = datetime.now().weekday()  # 0 = Monday, 6 = Sunday
        herb_order = ['tulsi', 'ginger', 'neem', 'mint', 'cinnamon', 'turmeric', 'cardamom']
        current_herb_id = herb_order[current_day]
        herbs_data = {
            "tulsi": {
                "name": "Tulsi (Holy Basil)",
                "tamil_name": "துளசி",
                "image_url": "images/tulsi.jpg",
                "tags": ["Respiratory Health", "Immunity", "Stress Relief"],
                "benefits": [
                    "Boosts immune system and fights infections",
                    "Reduces stress and anxiety",
                    "Improves respiratory health",
                    "Helps in treating cough and cold",
                    "Contains anti-inflammatory properties",
                    "Supports digestive health",
                    "Maintains healthy blood sugar levels"
                ],
                "ingredients": [
                    {"name": "Fresh Tulsi Leaves", "quantity": "10-12 leaves"},
                    {"name": "Water", "quantity": "1 cup"},
                    {"name": "Honey", "quantity": "1 teaspoon (optional)"}
                ],
                "procedure": [
                    "Wash the Tulsi leaves thoroughly",
                    "Boil 1 cup of water in a pan",
                    "Add the Tulsi leaves to the boiling water",
                    "Let it steep for 5-10 minutes",
                    "Strain the tea into a cup",
                    "Add honey if desired",
                    "Drink while warm"
                ],
                "precautions": [
                    "Avoid during pregnancy",
                    "May interact with certain medications",
                    "Do not consume on empty stomach",
                    "Consult healthcare provider if you have any medical conditions"
                ],
                "dosage": "Consume 2-3 times daily, preferably after meals",
                "where_to_buy": [
                    {
                        "name": "Local Herb Garden",
                        "address": "123 Herbal Street, Chennai",
                        "phone": "+91-123-456-7890"
                    },
                    {
                        "name": "Ayurvedic Store",
                        "address": "456 Natural Road, Chennai",
                        "phone": "+91-098-765-4321"
                    }
                ]
            },
            "ginger": {
                "name": "Ginger",
                "tamil_name": "இஞ்சி",
                "image_url": "images/ginger.jpg",
                "tags": ["Digestive Health", "Anti-inflammatory", "Immunity"],
                "benefits": [
                    "Aids digestion and reduces nausea",
                    "Has anti-inflammatory properties",
                    "Boosts immune system",
                    "Helps reduce muscle pain and soreness",
                    "May help with osteoarthritis"
                ],
                "ingredients": [
                    {"name": "Fresh Ginger Root", "quantity": "1 inch piece"},
                    {"name": "Water", "quantity": "1 cup"},
                    {"name": "Lemon", "quantity": "1 slice (optional)"},
                    {"name": "Honey", "quantity": "1 teaspoon (optional)"}
                ],
                "procedure": [
                    "Peel and slice the ginger root",
                    "Boil water in a pan",
                    "Add sliced ginger",
                    "Simmer for 10 minutes",
                    "Strain into a cup",
                    "Add lemon and honey if desired"
                ],
                "precautions": [
                    "May interact with blood-thinning medications",
                    "Consume in moderation if you have acid reflux",
                    "Consult doctor if pregnant or nursing",
                    "May lower blood sugar levels"
                ],
                "dosage": "1-2 cups daily, best consumed before meals",
                "where_to_buy": [
                    {
                        "name": "Fresh Market",
                        "address": "789 Market Street, Chennai",
                        "phone": "+91-111-222-3333"
                    },
                    {
                        "name": "Organic Store",
                        "address": "321 Green Road, Chennai",
                        "phone": "+91-444-555-6666"
                    }
                ]
            },
            "neem": {
                "name": "Neem",
                "tamil_name": "வேம்பு",
                "image_url": "images/neem.jpg",
                "tags": ["Blood Purifier", "Skin Health", "Immunity"],
                "benefits": [
                    "Natural blood purifier",
                    "Improves skin health",
                    "Boosts immune system",
                    "Anti-bacterial properties",
                    "Helps in dental care"
                ],
                "ingredients": [
                    {"name": "Neem Leaves", "quantity": "15-20 leaves"},
                    {"name": "Water", "quantity": "2 cups"}
                ],
                "procedure": [
                    "Wash neem leaves thoroughly",
                    "Boil water with neem leaves",
                    "Reduce to half",
                    "Strain and let it cool",
                    "Can be used internally or externally"
                ],
                "precautions": [
                    "Not recommended during pregnancy",
                    "May interfere with fertility",
                    "Avoid on empty stomach",
                    "Start with small doses"
                ],
                "where_to_buy": [
                    {
                        "name": "Herbal Medicine Shop",
                        "address": "567 Garden Road, Chennai",
                        "phone": "+91-777-888-9999"
                    }
                ]
            }
        }
        
        current_herb = herbs_data.get(current_herb_id, {
            "name": "Coming Soon",
            "tamil_name": "விரைவில் வருகிறது",
            "image_url": "images/placeholder.jpg",
            "tags": ["Future Herb"],
            "benefits": ["Details will be available soon"],
            "ingredients": [{"name": "To be announced", "quantity": "TBA"}],
            "procedure": ["Coming soon"],
            "precautions": ["Please check back later"],
            "dosage": "To be announced"
        })
        
        self.wfile.write(json.dumps(current_herb).encode())

def run(server_class=HTTPServer, handler_class=HerbHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting server on port {port}...')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('\nShutting down server...')
        httpd.server_close()

if __name__ == '__main__':
    run()
