export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export interface RiskResult {
  allowed: boolean;
  risk: RiskLevel;
  reason: string;
}

export class RiskAnalyzer {
  private highRiskWords = [
    "excluir",
    "deletar",
    "apagar",
    "remover",
    "cancelar",
    "sair",
    "logout",
    "delete",
    "remove",
    "destroy",
  ];

  private mediumRiskWords = [
    "salvar",
    "confirmar",
    "enviar",
    "aprovar",
    "reprovar",
    "efetivar",
    "bloquear",
    "desbloquear",
    "save",
    "submit",
    "confirm",
  ];

  analyze(text: string | null | undefined): RiskResult {
    const value = (text || "").toLowerCase().trim();

    if (!value) {
      return {
        allowed: false,
        risk: "MEDIUM",
        reason: "Elemento sem texto identificável",
      };
    }

    if (this.highRiskWords.some((word) => value.includes(word))) {
      return {
        allowed: false,
        risk: "HIGH",
        reason: "Ação potencialmente destrutiva ou de saída",
      };
    }

    if (this.mediumRiskWords.some((word) => value.includes(word))) {
      return {
        allowed: false,
        risk: "MEDIUM",
        reason: "Ação que pode alterar dados",
      };
    }

    return {
      allowed: true,
      risk: "LOW",
      reason: "Ação segura para exploração",
    };
  }
}