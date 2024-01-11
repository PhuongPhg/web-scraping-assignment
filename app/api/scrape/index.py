from bs4 import BeautifulSoup
import requests

url = "https://webscraper.io/test-sites/e-commerce/more/computers/laptops"
response = requests.get(url)

soup = BeautifulSoup(response.text, "html.parser")

a = soup.find("div", {"class": "row ecomerce-items ecomerce-items-more"})
print(a['data-items'])