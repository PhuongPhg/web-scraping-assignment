# from bs4 import BeautifulSoup
# import json
# from selenium import webdriver 
# from selenium.webdriver.common.keys import Keys
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# from selenium.webdriver.chrome.options import Options

# options = Options()
# options.add_argument('--headless')
# options.add_argument('--disable-gpu')

# class Product():
#     def __init__(self, name, price):
#         self.name = name
#         self.price = price


# url = "https://webscraper.io/test-sites/e-commerce/more/computers/laptops"
# driver = webdriver.Chrome(options=options)  
# driver.get(url)
# wait = WebDriverWait(driver, 10)
# product_list = []
# # Simulate continuous click More using JavaScript
# while True:
#     try:
#         more_btn = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, 'ecomerce-items-scroll-more')))
#         more_btn.click()
#     except:
#         # The button is not clickable anymore
#         break

# html = driver.page_source 

# soup = BeautifulSoup(html, "html.parser")
# wrapper_card = soup.find_all("div", class_='card product-wrapper thumbnail')
# for card in wrapper_card:
#     name = card.find("a", class_='title').text
#     price = card.find("h4", class_='float-end price pull-right').text
#     product_list.append({"name": name, "price": price})

# print(json.dumps(product_list))

from bs4 import BeautifulSoup
import requests

url = "https://webscraper.io/test-sites/e-commerce/more/computers/laptops"
response = requests.get(url)

soup = BeautifulSoup(response.text, "html.parser")

a = soup.find("div", {"class": "row ecomerce-items ecomerce-items-more"})
print(a['data-items'])