import requests
from bs4 import BeautifulSoup
import csv
import os
import time
import urllib3
import re

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

url_base = "https://www.utfpr.edu.br"
url = url_base + "/cursos/coordenacoes/stricto-sensu/ppgec-ct/editais"

response = requests.get(url, verify=False)

if response.status_code == 200:
    soup = BeautifulSoup(response.content, 'html.parser')
    editais_data = []
    listings = soup.find_all('div', class_='listing-item')
    
    for listing in listings:
        # Capturando especificamente o título dentro da tag <h3>
        titulo_tag = listing.find('h3', class_='text-dsGray-900')
        if titulo_tag:
            titulo = titulo_tag.get_text(strip=True)  # Extrai apenas o texto dentro do <h3>
            link_tag = listing.find('a')
            if link_tag:
                link_edital_principal = url_base + link_tag['href']

                # Acessar o link do edital principal
                response_edital = requests.get(link_edital_principal, verify=False)
                if response_edital.status_code == 200:
                    soup_edital = BeautifulSoup(response_edital.content, 'html.parser')

                    descricao = soup_edital.find('div', class_='entry-content').get_text(strip=True) if soup_edital.find('div', class_='entry-content') else 'Descrição não encontrada'

                    # Procurar o próximo link (Campo 3) dentro da página do edital principal
                    link_final_tag = soup_edital.find('a', class_="text-[#0169CD]")  # Procurando a classe específica
                    link_edital_final = link_final_tag['href'] if link_final_tag else 'Link final não encontrado'

                    # Verifica se o link é relativo e completa com o URL base, se necessário
                    if link_edital_final.startswith('/'):
                        link_edital_final = "https://sei.utfpr.edu.br" + link_edital_final


                    else:
                        print(f"Seção de cronograma não encontrada para: {titulo}")
                        editais_data.append([titulo, link_edital_principal, link_edital_final, descricao, 'Cronograma não encontrado', ''])

                    time.sleep(1)  # Pausa para evitar bloqueio de IP
                else:
                    print(f"Falha ao acessar o edital principal: {link_edital_principal}")
                    editais_data.append([titulo, link_edital_principal, 'Link final não encontrado', 'Falha ao acessar o edital principal', '', ''])

    output_filename = 'PPGEC_editais_utfpr.csv'

    file_exists = os.path.isfile(output_filename)

    with open(output_filename, mode='a', newline='', encoding='utf-8-sig') as file:
        writer = csv.writer(file, delimiter='¢')  # Define o delimitador como "¢"

        if not file_exists:
            writer.writerow(['Título', 'Link 1', 'Link 2', 'Descrição'])

        existing_data = set()
        if file_exists:
            with open(output_filename, mode='r', newline='', encoding='utf-8') as read_file:
                reader = csv.reader(read_file, delimiter='¢')  # Usa o mesmo delimitador ao ler
                existing_data = {tuple(row) for row in reader}

        for edital in editais_data:
            if tuple(edital) not in existing_data:  # Verifica se os dados já estão no arquivo
                writer.writerow(edital)

    print(f"Dados extraídos e salvos/atualizados em '{output_filename}' com sucesso!")
else:
    print(f"Falha ao acessar a página")