var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as mediaRepo from '../repositories/media.repositories.js';
import { newMediaSchema } from '../schemas/schemas.js';
import httpStatus from 'http-status';
function newMedia(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var newMediaData, title, link, relevance, platform, validation, insertMedia, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newMediaData = req.body;
                    title = newMediaData.title, link = newMediaData.link, relevance = newMediaData.relevance, platform = newMediaData.platform;
                    validation = newMediaSchema.validate(newMediaData);
                    if (validation.error) {
                        return [2 /*return*/, res.status(httpStatus.BAD_REQUEST).send('Os campos n??o est??o preenchidos corretamente!')];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, mediaRepo.insertMedia({
                            title: title,
                            link: link,
                            relevance: relevance,
                            platform: platform
                        })];
                case 2:
                    insertMedia = _a.sent();
                    console.log(insertMedia);
                    return [2 /*return*/, res.status(httpStatus.CREATED).send("Novo t??tulo adicionado com sucesso!")];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    if (error_1.code === '23505') {
                        return [2 /*return*/, res.status(httpStatus.CONFLICT).send('Esse t??tulo j?? foi adicionado!')];
                    }
                    return [2 /*return*/, res.status(httpStatus.IM_A_TEAPOT).send('Tem que v?? isso a??')];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function newCategory(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var newCategoryData, mediaId, category, insertCategory, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newCategoryData = req.body;
                    mediaId = newCategoryData.mediaId, category = newCategoryData.category;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, mediaRepo.insertCategory({
                            mediaId: mediaId,
                            category: category
                        })];
                case 2:
                    insertCategory = _a.sent();
                    return [2 /*return*/, res.status(httpStatus.CREATED).send("Novo t??tulo adicionado com sucesso!")];
                case 3:
                    error_2 = _a.sent();
                    console.log(error_2);
                    if (error_2.code === '23505') {
                        return [2 /*return*/, res.status(httpStatus.CONFLICT).send('N??o era pra dar esse erro n')];
                    }
                    return [2 /*return*/, res.status(httpStatus.IM_A_TEAPOT).send('Tem que v?? isso a??')];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getMedia(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var selectMedia, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, mediaRepo.selectMedia()];
                case 1:
                    selectMedia = _a.sent();
                    return [2 /*return*/, res.status(httpStatus.OK).send(selectMedia.rows)];
                case 2:
                    error_3 = _a.sent();
                    console.log(error_3);
                    return [2 /*return*/, res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Erro interno')];
                case 3: return [2 /*return*/];
            }
        });
    });
}
export { newMedia, newCategory, getMedia };
