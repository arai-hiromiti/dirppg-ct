import importlib
import sys

scripts = ["CPGEI", "PPGA", "PPGCA", "PPGTA", "PPGEB", "PPGEC", "PPGEF", "PPGEL", "PPGEM", "PPGFA", "PPGPGP", "PPGQ", "PPGSAU", "PPGSE", "PPGTE", "PROFMAT", "import requests"]

def run_script(script_name):
    try:
        module = importlib.import_module(script_name)

        if hasattr(module, 'main'):
            print(f"Executando {script_name}.py")
            module.main()
        else:
            print(f"{script_name}.py não contém uma função main() para executar.")
    except Exception as e:
        print(f"Erro ao executar {script_name}.py: {e}")

if __name__ == "__main__":
    for script in scripts:
        run_script(script)