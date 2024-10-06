import csv
import selenium
from itertools import chain

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import time

EDUARDO = False
HIROMITI = True

chunk_size = 9
output_filename = 'output.csv'
url = "https://sei.utfpr.edu.br/sei/publicacoes/controlador_publicacoes.php?acao=publicacao_pesquisar&acao_origem" \
      "=publicacao_pesquisar&id_orgao_publicacao=0&rdo_data_publicacao=I#ancoraBarraPesquisa"


def doStuff():
    try:
        WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, "sbmPesquisar"))).click()
        time.sleep(1)
        extract_title_data(driver.page_source, output_filename)
        scrape_all_pages()
        driver.quit()
    except Exception as e:
        print("Não foi possível clicar no botão Pesquisar:", e)


def extract_data_from_page(page_source):
    soup = BeautifulSoup(page_source, 'html.parser')
    '''links = soup.find_all('a', class_='ancoraPadraoAzul')
    for link in links:
        texto = link.text.strip()
        href = link['href']
        print(f"ID: {texto}, Link: {href}")

    siglas = soup.find_all('a', class_='ancoraSigla')
    for sigla in siglas:
        texto_sigla = sigla.text.strip()
        print(f"Sigla: {texto_sigla}")'''

    text_data = soup.find_all('td', class_='tdDados')
    chunks = chunk_data(text_data)
    write_to_file(chunks, output_filename, 'a')


def extract_title_data(page_source, filename):
    soup = BeautifulSoup(page_source, 'html.parser')
    titles = []
    th_elements = soup.find_all('th')  # Find all <th> elements

    for th in th_elements:
        title_text = th.text.strip()
        if title_text:  # Check if title_text is not empty
            titles.append(title_text)

    if titles:
        chunks = chunk_data(titles)  # Convert titles list to a chunked list
        write_to_file(chunks, filename, 'w')
    else:
        print("No titles found.")


def write_to_file(chunks, filename, file_parameter):
    with open(filename, file_parameter, newline='', encoding='utf-8') as csvfile:  # Specify encoding
        writer = csv.writer(csvfile)
        for chunk in chunks:
            row = [cell.text.strip() if hasattr(cell, 'text') else str(cell) for cell in chunk]
            writer.writerow(row)


def chunk_data(data):
    return [data[i:i + chunk_size] for i in range(0, len(data), chunk_size)]


def scrape_all_pages():
    while True:
        page_source = driver.page_source
        extract_data_from_page(page_source)

        try:
            next_button = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, "//a[contains(text(), 'Próxima')]"))
            )
            driver.execute_script(next_button.get_attribute("href"))
            time.sleep(2)  # Espera 2 segundos para a próxima página carregar completamente
        except Exception as e:
            print("Não foi possível encontrar o botão Próxima ou ocorreu um erro:", e)
            break


if HIROMITI:
    edge_path = r'C:\Users\gabri\OneDrive\Hiromiti-kun\Documentos\edgedriver_win64\msedgedriver.exe'
    options = webdriver.EdgeOptions()
    options.use_chromium = True

    driver = webdriver.Edge(options=options)
    driver.get(url)
    doStuff()

elif EDUARDO:
    driver = webdriver.Chrome()
    driver.get(url)
    doStuff()