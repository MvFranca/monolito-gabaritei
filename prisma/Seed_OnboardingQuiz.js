"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../src/database/prisma");
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        const subjects = [
            { name: "Física", options: ["Cinemática", "Dinâmica", "Energia", "Eletricidade", "Ondas", "Termodinâmica", "Óptica"] },
            { name: "Química", options: ["Ligações Químicas", "Reações Químicas", "Química Orgânica", "Soluções", "Eletroquímica"] },
            { name: "Biologia", options: ["Citologia", "Genética", "Ecologia", "Evolução", "Fisiologia Humana", "Biotecnologia"] },
            { name: "Língua Portuguesa", options: ["Interpretação de Texto", "Tipos Textuais", "Figuras de Linguagem", "Funções da Linguagem"] },
            { name: "Literatura", options: ["Escolas Literárias", "Modernismo", "Romantismo", "Classicismo"] },
            { name: "História", options: ["Brasil Colônia", "Ditadura Militar", "Revolução Industrial", "Primeira e Segunda Guerra Mundial"] },
            { name: "Geografia", options: ["Geopolítica", "Climatologia", "Globalização", "Agricultura"] },
            { name: "Filosofia", options: ["Existencialismo", "Filosofia Moderna", "Ética e Moral"] },
            { name: "Sociologia", options: ["Cultura", "Movimentos Sociais", "Cidadania"] },
        ];
        for (const subject of subjects) {
            yield prisma_1.prisma.moduleMatterContent.create({
                data: {
                    name: subject.name,
                    options: subject.options,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
            });
        }
        console.log("Seed concluído com sucesso!");
    });
}
seed()
    .catch(e => console.error(e))
    .finally(() => prisma_1.prisma.$disconnect());
