package Etapa1;

public class PrincipalLabirinto {
    public static void main(String[] args) {
        Labirinto labirinto = new Labirinto();
        
        // Carrega o labirinto a partir do arquivo de texto
        labirinto.criaLabirinto("labirinto.txt");
        
        // Exibe o labirinto inicial
        System.out.println("Labirinto inicial:");
        labirinto.imprimeLabirinto();
        
        // Executa a busca pela saída
        boolean encontrouSaida = labirinto.percorreLabirinto();
        
        // Exibe o resultado da busca
        if (encontrouSaida) {
            System.out.println("\nSolução encontrada:");
            labirinto.imprimeLabirinto();
        } else {
            System.out.println("\nNenhuma solução encontrada.");
        }
    }
}
