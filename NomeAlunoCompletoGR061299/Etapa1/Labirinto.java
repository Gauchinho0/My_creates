package Etapa1;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Labirinto {
    private static final char PAREDE = 'X';
    private static final char CAMINHO_ABERTO = ' ';
    private static final char SAIDA = 'D';
    private static final char CAMINHO_SOLUCAO = '#';
    private char[][] labirinto;
    private boolean[][] visitado;

    // Método criaLabirinto: Lê o labirinto de um arquivo de texto
    public void criaLabirinto(String filename) {
        try (BufferedReader br = new BufferedReader(new FileReader(filename))) {
            // Determina o tamanho do labirinto
            int linhas = 0;
            int colunas = 0;
            String linha;
            
            while ((linha = br.readLine()) != null) {
                colunas = linha.length();
                linhas++;
            }
            br.close();

            labirinto = new char[linhas][colunas];
            visitado = new boolean[linhas][colunas];

            // Reabre o arquivo para preencher o array bidimensional
            BufferedReader br2 = new BufferedReader(new FileReader(filename));
            int i = 0;
            while ((linha = br2.readLine()) != null) {
                labirinto[i] = linha.toCharArray();
                i++;
            }
            br2.close();
        } catch (IOException e) {
            System.out.println("Erro ao ler o arquivo: " + e.getMessage());
        }
    }

    // Método percorreLabirinto: Inicia a busca recursiva pela saída
    public boolean percorreLabirinto() {
        return resolverLabirinto(0, 0);
    }

    // Método recursivo resolverLabirinto
    private boolean resolverLabirinto(int x, int y) {
        // Verifica se está fora dos limites
        if (x < 0 || x >= labirinto.length || y < 0 || y >= labirinto[0].length) {
            return false;
        }

        // Se encontrou a saída
        if (labirinto[x][y] == SAIDA) {
            return true;
        }

        // Se for uma parede ou já foi visitado
        if (labirinto[x][y] == PAREDE || visitado[x][y]) {
            return false;
        }

        // Marca como visitado
        visitado[x][y] = true;

        // Tenta mover para os quatro lados (cima, baixo, esquerda, direita)
        if (resolverLabirinto(x - 1, y) || resolverLabirinto(x + 1, y) || 
            resolverLabirinto(x, y - 1) || resolverLabirinto(x, y + 1)) {
            labirinto[x][y] = CAMINHO_SOLUCAO; // Marca o caminho como parte da solução
            return true;
        }

        return false;
    }

    // Método imprimeLabirinto: Exibe o labirinto, com o caminho da solução, se houver
    public void imprimeLabirinto() {
        for (char[] linha : labirinto) {
            for (char c : linha) {
                System.out.print(c + " ");
            }
            System.out.println();
        }
    }
}
