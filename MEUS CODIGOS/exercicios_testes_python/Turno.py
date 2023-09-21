turno = input("digit seu turno(M para Manhã, T para Tarde, N para Noite): ")
if turno == "M" or turno == "m":
    print ('Bom dia!')
elif turno == "T" or turno == "t":
    print ('Bom tarde!')
elif turno == "N" or turno == "t":
    print ('Boa noite')
else:
    print ('turno invalido')

