package Etapa2;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class ValidadorEtapa2Estudante {
    public static void main(String[] args) {
        // Códigos ANSI para colorir o texto
        String ANSI_RESET = "\u001B[0m";
        String ANSI_VERDE = "\u001B[32m";
        String ANSI_VERMELHO = "\u001B[31m";
        String ANSI_LARANJA = "\u001B[38;5;208m";

        // Impressão do cabeçalho
        System.out.println(ANSI_LARANJA + "+----------------------------------------------------------+");
        System.out.println("|                Etapa 2 | Validador do Estudante           |");
        System.out.println("+----------------------------------------------------------+" + ANSI_RESET);

        // Validação dos componentes
        validaClasse("Candidato");
        validaAtributo("Candidato", "nome");
        validaAtributo("Candidato", "partido");
        validaAtributo("Candidato", "intencoesVotos");
        validaMetodo("Candidato", "getNome");
        validaMetodo("Candidato", "setNome", String.class);
        validaMetodo("Candidato", "getPartido");
        validaMetodo("Candidato", "setPartido", String.class);
        validaMetodo("Candidato", "getIntencoesVotos");
        validaMetodo("Candidato", "setIntencoesVotos", int.class);
        validaMetodo("Candidato", "toString");

        validaClasse("OrdenarCandidatos");
        validaMetodo("OrdenarCandidatos", "ordenaCandidatosPorNome", Candidato[].class);
        validaMetodo("OrdenarCandidatos", "ordenaCandidatosPorVotos", Candidato[].class);
        validaMetodo("OrdenarCandidatos", "ordenaCandidatosPorPartido", Candidato[].class);
        validaMetodo("OrdenarCandidatos", "pesquisaBinariaCandidatos", Candidato[].class, String.class);

        // Verificação da existência da classe PrincipalCandidatos e seu método main
        validaClasse("PrincipalCandidatos");
        validaMetodo("PrincipalCandidatos", "main", String[].class);

        // Verificação das chamadas aos métodos de ordenação na classe PrincipalCandidatos
        validaChamadasMetodosOrdenacao("E:/ViniciusBischoffGR96004-00050/Etapa2/PrincipalCandidatos.java");

        // Impressão da linha de separação
        System.out.println(ANSI_LARANJA + "+----------------------------------------------------------+" + ANSI_RESET);
    }

    // Método para validar a existência de uma classe
    private static void validaClasse(String nomeClasse) {
        try {
            Class.forName("Etapa2." + nomeClasse);
            System.out.println(formatarMensagem("[OK] Classe " + nomeClasse + " encontrada.", true));
        } catch (ClassNotFoundException e) {
            System.out.println(formatarMensagem("[NOK] Classe " + nomeClasse + " não encontrada.", false));
        }
    }

    // Método para validar a existência de um método
    private static void validaMetodo(String nomeClasse, String nomeMetodo, Class<?>... parametros) {
        try {
            Class<?> classe = Class.forName("Etapa2." + nomeClasse);
            classe.getDeclaredMethod(nomeMetodo, parametros);
            System.out.println(formatarMensagem("[OK] Método " + nomeMetodo + " encontrado.", true));
        } catch (ClassNotFoundException e) {
            System.out.println(formatarMensagem("[NOK] Classe " + nomeClasse + " não encontrada.", false));
        } catch (NoSuchMethodException e) {
            System.out.println(formatarMensagem("[NOK] Método " + nomeMetodo + " não encontrado.", false));
        }
    }

    // Método para validar a existência de um atributo
    private static void validaAtributo(String nomeClasse, String nomeAtributo) {
        try {
            Class<?> classe = Class.forName("Etapa2." + nomeClasse);
            Field campo = classe.getDeclaredField(nomeAtributo);
            System.out.println(formatarMensagem("[OK] Atributo " + nomeAtributo + " encontrado.", true));
        } catch (ClassNotFoundException e) {
            System.out.println(formatarMensagem("[NOK] Classe " + nomeClasse + " não encontrada.", false));
        } catch (NoSuchFieldException e) {
            System.out.println(formatarMensagem("[NOK] Atributo " + nomeAtributo + " não encontrado.", false));
        }
    }

    // Método para validar as chamadas aos métodos de ordenação na classe PrincipalCandidatos
    private static void validaChamadasMetodosOrdenacao(String caminhoArquivo) {
        try (BufferedReader br = new BufferedReader(new FileReader(caminhoArquivo))) {
            String linha;
            boolean chamouPorNome = false;
            boolean chamouPorVotos = false;
            boolean chamouPorPartido = false;

            while ((linha = br.readLine()) != null) {
                // Ignorar linhas comentadas
                if (linha.trim().startsWith("//")) {
                    continue;
                }

                if (linha.contains("OrdenarCandidatos.ordenaCandidatosPorPartido")) {
                    chamouPorPartido = true;
                }
                if (linha.contains("OrdenarCandidatos.ordenaCandidatosPorVotos")) {
                    chamouPorVotos = true;
                }
                if (linha.contains("OrdenarCandidatos.ordenaCandidatosPorNome")) {
                    chamouPorNome = true;
                }
            }

            if (chamouPorNome && chamouPorVotos && chamouPorPartido) {
                System.out.println(formatarMensagem("[OK] Todos os métodos de ordenação foram chamados.", true));
            } else {
                if (!chamouPorNome) {
                    System.out.println(formatarMensagem("[NOK] Método ordenaCandidatosPorNome não foi chamado.", false));
                }
                if (!chamouPorVotos) {
                    System.out.println(formatarMensagem("[NOK] Método ordenaCandidatosPorVotos não foi chamado.", false));
                }
                if (!chamouPorPartido) {
                    System.out.println(formatarMensagem("[NOK] Método ordenaCandidatosPorPartido não foi chamado.", false));
                }
            }
        } catch (IOException e) {
            System.out.println(formatarMensagem("[NOK] Erro ao validar chamadas aos métodos de ordenação: " + e.getMessage(), false));
        }
    }

    // Método para formatar mensagens com cores
    private static String formatarMensagem(String mensagem, boolean ok) {
        String ANSI_VERDE = "\u001B[32m";
        String ANSI_VERMELHO = "\u001B[31m";
        String ANSI_RESET = "\u001B[0m";
        return String.format((ok ? ANSI_VERDE : ANSI_VERMELHO) + "| %-56s |" + ANSI_RESET, mensagem);
    }
}
