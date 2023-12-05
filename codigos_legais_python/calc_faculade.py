print("\nCalculadora nota de Provas (soma nota total e nota media para tirar media)\n")

def verificar_numero(nota_nome):
    while True:
        try:
            num = float(input(f'\nDigite nota {nota_nome}: '))
            if 0 <= num <= 10:
                return num
            else:
                print(f"\nPor favor, insira a nota {nota_nome} entre 10 e 0.")
        except ValueError:
            print(f"\nPor favor, insira um número válido para {nota_nome}.")

# Loop para garantir escolha válida
escolha = ""
while escolha.lower() not in ["soma", "media"]:
    escolha = input("Escolha a opção (soma / media): ")
    if escolha.lower() not in ["soma", "media"]:
        print("\nEscolha inválida. Por favor, escolha entre as opções 'soma' ou 'media'.\n")

if escolha.lower() == "soma":
    # Calculando a soma das notas GA e GB
    nota_ga = verificar_numero("GA")
    nota_gb = verificar_numero("GB")  # Recebe a nota de GB diretamente
    
    nota_final = nota_ga * 0.3 + nota_gb * 0.7
    
    # Exibindo o resultado final da soma
    print(f'\nO resultado final da soma é: {nota_final:.2f}\n')

elif escolha.lower() == "media":
    # Informando a nota de GA que já foi obtida
    nota_ga = verificar_numero("GA") * 0.3
    
    # Calculando o quanto falta na nota de GB para atingir a média 6
    nota_gb_faltando = (6 - nota_ga) / 0.7
    
    # Exibindo o quanto falta na nota de GB para atingir a média 6
    print(f'\nVocê precisa tirar pelo menos na prova {nota_gb_faltando:.2f} da nota da prova GB (nota Bruta) para atingir a média 6.')

    # A nota poderada é a notaGB ja multiplicada pelo 0.7 multiplicado
    nota_gb_ponderada = nota_gb_faltando * 0.7

    # Exibindo o resultado ponderado de GB usando a média 6
    print(f'O resultado ponderado (GBx07) de GB usando a média 6 é: {nota_gb_ponderada:.2f}\n')
