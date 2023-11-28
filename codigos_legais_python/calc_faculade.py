print ('\nCalculadora nota de Provas \n') 

#Função de verificação_numero
#Caso o usuario insira um caracter que nao seja um numero e dentro do raio de (10,0)
#Retorna sempre a classe errada mantendo a anterior "GA" e "GB"

def verificar_numero(nota_nome):
    while True:
        try:
            num = float(input(f'Digite nota {nota_nome}: '))
            if 0 <= num <= 10:
                return num
            else:
                print(f"Por favor, insira a nota {nota_nome} entre 10 e 0.")
        except ValueError:
            print(f"Por favor, insira um número válido para {nota_nome}.")

num1 = verificar_numero("Grau A")
num2 = verificar_numero("Grau B")

nota_final = num1 * 0.3 + num2 * 0.7
print('\nNota Grade Final:', nota_final,'\n')