import { describe, expect, it } from "vitest";

import { mensagemEnvioOrcamento } from "@/features/orcamentos/mensagem-envio";

const base = {
  nomeCliente: "Rodrigo Lemos",
  tipoEvento: "Aniversário infantil",
  data: "18/02/2027",
  convidados: 40,
  urlAcesso: "https://site/",
};

const normalizar = (texto: string) => texto.replace(/\u00a0/g, " ");

describe("mensagemEnvioOrcamento", () => {
  it("mostra o frete à parte quando existe", () => {
    const texto = normalizar(mensagemEnvioOrcamento({ ...base, total: 516, frete: 444 }));
    expect(texto).toBe(
      normalizar(
        [
          "Olá, Rodrigo! Seu orçamento está pronto 🎉",
          "Aniversário infantil · 18/02/2027 · 40 convidados",
          "Valor total: R$ 72,00\n+ frete de R$ 444,00",
          "Para visualizar todos os detalhes do orçamento, acesse:",
          "https://site/",
          "Caso queira alterar algum item do cardápio ou solicitar alguma modificação, responda esta mensagem ou fale conosco pelo WhatsApp",
        ].join("\n\n"),
      ),
    );
  });

  it("não fala de frete quando não há", () => {
    const texto = normalizar(mensagemEnvioOrcamento({ ...base, total: 516, frete: 0 }));
    expect(texto).toContain("Valor total: R$ 516,00");
    expect(texto).not.toContain("frete");
  });
});
