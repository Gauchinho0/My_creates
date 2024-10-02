package Etapa1;

import java.lang.reflect.Method;

public class ValidadorEtapa1Estudante {
    // Códigos ANSI para colorir o texto
    private static final String ANSI_RESET = "\u001B[0m";
    private static final String ANSI_VERDE = "\u001B[32m";
    private static final String ANSI_VERMELHO = "\u001B[31m";
    private static final String ANSI_LARANJA = "\u001B[38;5;208m";

    public static void main(String[] args) {

        // Impressão do cabeçalho
        imprimeLinhaAlinhada("",300);
        imprimeLinhaAlinhada("+---------------------------------------------------------------------------+", 60);
        imprimeLinhaAlinhada("|                Validador Etapa 1 Estudante                                |", 60);
        imprimeLinhaAlinhada("+---------------------------------------------------------------------------+", 60);

        // Validação dos 12 elementos
        validaClasse("Labirinto");

        // Criação de uma única instância do Labirinto para usar em todos os testes
        Object instanciaLabirinto = criaInstanciaClasse("Labirinto");

        // Verifica se o labirinto foi criado com sucesso
        boolean labirintoCriado = validaExecucaoMetodoComParametro(instanciaLabirinto, "criaLabirinto", "Etapa1/labirinto.txt");

        // Só valida percorreLabirinto se o labirinto foi criado com sucesso
        if (labirintoCriado) {
            System.out.println(ANSI_LARANJA + "[OK] Labirinto foi criado com sucesso. Tentando percorrer o labirinto..." + ANSI_RESET);
            validaExecucaoMetodo(instanciaLabirinto, "percorreLabirinto");
        } else {
            System.out.println(ANSI_VERMELHO + "[NOK] O labirinto não foi criado. Verifique se o arquivo labirinto.txt existe no caminho correto." + ANSI_RESET);
        }

        validaMetodo("Labirinto", "imprimeLabirinto");
        validaAtributo("Labirinto", "PAREDE");
        validaAtributo("Labirinto", "CAMINHO_ABERTO");
        validaAtributo("Labirinto", "SAIDA");
        validaAtributo("Labirinto", "CAMINHO_SOLUCAO");
        validaClasse("PrincipalLabirinto");
        validaExecucaoClassePrincipal("PrincipalLabirinto", "Solução encontrada");
        validaRecursao("Labirinto");
        validaTryCatch("Labirinto", "criaLabirinto");

        // Impressão da linha de finalização
        System.out.println(ANSI_LARANJA + "+---------------------------------------------------------------------------+" + ANSI_RESET);
    }

    // Método para criar uma instância de uma classe
    private static Object criaInstanciaClasse(String nomeClasse) {
        try {
            Class<?> classe = Class.forName("Etapa1." + nomeClasse);
            return classe.getDeclaredConstructor().newInstance();
        } catch (Exception e) {
            System.out.println(ANSI_VERMELHO + "[NOK] Erro ao criar instância da classe " + nomeClasse + ": " + e.getCause() + ANSI_RESET);
            e.printStackTrace();
            return null;
        }
    }

    // Método para validar a execução de um método com parâmetros em uma instância específica
    private static boolean validaExecucaoMetodoComParametro(Object instancia, String nomeMetodo, String parametro) {
        try {
            Method metodo = instancia.getClass().getDeclaredMethod(nomeMetodo, String.class);
            metodo.invoke(instancia, parametro);
            System.out.println(ANSI_VERDE + "[OK] Método " + nomeMetodo + " executado com sucesso." + ANSI_RESET);
            return true; // Retorna true se o método foi executado com sucesso
        } catch (Exception e) {
            System.out.println(ANSI_VERMELHO + "[NOK] Erro ao executar método " + nomeMetodo + ": " + e.getCause() + ANSI_RESET);
            e.printStackTrace();
            return false; // Retorna false se houve erro
        }
    }

    // Método para validar a execução de um método sem parâmetros em uma instância específica
    private static void validaExecucaoMetodo(Object instancia, String nomeMetodo) {
        try {
            Method metodo = instancia.getClass().getDeclaredMethod(nomeMetodo);
            Object resultado = metodo.invoke(instancia);

            if (resultado instanceof Boolean && (Boolean) resultado) {
                System.out.println(ANSI_VERDE + "[OK] Método " + nomeMetodo + " executado com sucesso." + ANSI_RESET);
            } else {
                System.out.println(ANSI_VERMELHO + "[NOK] Método " + nomeMetodo + " não encontrou a saída." + ANSI_RESET);
            }
        } catch (Exception e) {
            System.out.println(ANSI_VERMELHO + "[NOK] Erro ao executar método " + nomeMetodo + ": " + e.getCause() + ANSI_RESET);
            e.printStackTrace();
        }
    }

    // Método para validar a existência de uma classe
    private static void validaClasse(String nomeClasse) {
        try {
            Class.forName("Etapa1." + nomeClasse);
            System.out.println(ANSI_VERDE + "[OK] Classe " + nomeClasse + " encontrada." + ANSI_RESET);
        } catch (ClassNotFoundException e) {
            System.out.println(ANSI_VERMELHO + "[NOK] Classe " + nomeClasse + " não encontrada." + ANSI_RESET);
        }
    }

    // Método para validar a existência de um método
    private static void validaMetodo(String nomeClasse, String nomeMetodo) {
        try {
            Class<?> classe = Class.forName("Etapa1." + nomeClasse);
            classe.getDeclaredMethod(nomeMetodo);
            System.out.println(ANSI_VERDE + "[OK] Método " + nomeMetodo + " encontrado." + ANSI_RESET);
        } catch (Exception e) {
            System.out.println(ANSI_VERMELHO + "[NOK] Método " + nomeMetodo + " não encontrado." + ANSI_RESET);
        }
    }

    // Método para validar a existência de um atributo
    private static void validaAtributo(String nomeClasse, String nomeAtributo) {
        try {
            Class<?> classe = Class.forName("Etapa1." + nomeClasse);
            classe.getDeclaredField(nomeAtributo);
            System.out.println(ANSI_VERDE + "[OK] Atributo " + nomeAtributo + " encontrado." + ANSI_RESET);
        } catch (Exception e) {
            System.out.println(ANSI_VERMELHO + "[NOK] Atributo " + nomeAtributo + " não encontrado." + ANSI_RESET);
        }
    }

    // Método para validar a execução da classe PrincipalLabirinto e verificar a mensagem "Solução encontrada"
    private static void validaExecucaoClassePrincipal(String nomeClasse, String textoEsperado) {
        try {
            // Captura a saída padrão
            java.io.ByteArrayOutputStream baos = new java.io.ByteArrayOutputStream();
            java.io.PrintStream ps = new java.io.PrintStream(baos);
            java.io.PrintStream oldOut = System.out;
            System.setOut(ps);

            // Executa a classe principal
            Class<?> classe = Class.forName("Etapa1." + nomeClasse);
            Method metodoMain = classe.getMethod("main", String[].class);
            metodoMain.invoke(null, (Object) new String[]{});

            // Restaura a saída padrão
            System.out.flush();
            System.setOut(oldOut);

            String saidaConsole = baos.toString();
            if (saidaConsole.contains(textoEsperado)) {
                System.out.println(ANSI_VERDE + "[OK] Classe " + nomeClasse + " executada com sucesso." + ANSI_RESET);
            } else {
                System.out.println(ANSI_VERMELHO + "[NOK] Classe " + nomeClasse + " não encontrou a solução." + ANSI_RESET);
            }
        } catch (Exception e) {
            System.out.println(ANSI_VERMELHO + "[NOK] Erro ao executar classe " + nomeClasse + ": " + e.getCause() + ANSI_RESET);
            e.printStackTrace();
        }
    }

    // Método para validar se a classe Labirinto usa recursão
    private static void validaRecursao(String nomeClasse) {
        try {
            Class<?> classe = Class.forName("Etapa1." + nomeClasse);
            Method[] metodos = classe.getDeclaredMethods();
            boolean recursivo = false;

            for (Method metodo : metodos) {
                // Verifica se o método chama a si mesmo
                String metodoName = metodo.getName();
                String metodoString = metodo.toString();
                if (metodoString.contains(nomeClasse + "." + metodoName + "(")) {
                    recursivo = true;
                    break;
                }
            }

            if (recursivo) {
                System.out.println(ANSI_VERDE + "[OK] Método recursivo encontrado na classe " + nomeClasse + "." + ANSI_RESET);
            } else {
                System.out.println(ANSI_VERMELHO + "[NOK] Nenhum método recursivo encontrado na classe " + nomeClasse + "." + ANSI_RESET);
            }
        } catch (ClassNotFoundException e) {
            System.out.println(ANSI_VERMELHO + "[NOK] Classe " + nomeClasse + " não encontrada." + ANSI_RESET);
        } catch (Exception e) {
            System.out.println(ANSI_VERMELHO + "[NOK] Erro ao verificar recursão na classe " + nomeClasse + ": " + e.getCause() + ANSI_RESET);
            e.printStackTrace();
        }
    }

    // Método para validar o uso de try-catch no método criaLabirinto
    private static void validaTryCatch(String nomeClasse, String nomeMetodo) {
        try {
            Class<?> classe = Class.forName("Etapa1." + nomeClasse);
            Method metodo = classe.getDeclaredMethod(nomeMetodo, String.class);
            Object instancia = classe.getDeclaredConstructor().newInstance();

            try {
                metodo.invoke(instancia, "arquivo_inexistente.txt");
                System.out.println(ANSI_VERMELHO + "[NOK] Método " + nomeMetodo + " deveria ter tratado a exceção." + ANSI_RESET);
            } catch (Exception e) {
                if (e.getCause() instanceof IllegalArgumentException) {
                    System.out.println(ANSI_VERDE + "[OK] Método " + nomeMetodo + " contém try-catch." + ANSI_RESET);
                } else {
                    System.out.println(ANSI_VERMELHO + "[NOK] Método " + nomeMetodo + " lançou uma exceção inesperada." + ANSI_RESET);
                }
            }
        } catch (NoSuchMethodException e) {
            System.out.println(ANSI_VERMELHO + "[NOK] Método " + nomeMetodo + " não encontrado na classe " + nomeClasse + "." + ANSI_RESET);
        } catch (ClassNotFoundException e) {
            System.out.println(ANSI_VERMELHO + "[NOK] Classe " + nomeClasse + " não encontrada." + ANSI_RESET);
        } catch (Exception e) {
            System.out.println(ANSI_VERMELHO + "[NOK] Erro ao validar try-catch no método " + nomeMetodo + ": " + e.getCause() + ANSI_RESET);
            e.printStackTrace();
        }
    }
    // Método alinhamento cabecario
    private static void imprimeLinhaAlinhada(String linha, int comprimentoTotal) {
        StringBuilder sb = new StringBuilder(linha);
        while (sb.length() < comprimentoTotal) {
            sb.append(" ");
        }
        System.out.println(ANSI_LARANJA + sb.toString() + ANSI_RESET);
    }
}
