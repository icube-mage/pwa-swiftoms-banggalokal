/* eslint-disable import/prefer-default-export */
import { optionsDashboard } from '@modules/theme/helpers/menuDashboard';
import { optionsOrder } from '@modules/theme/helpers/menuOrder';
import { optionsPickPack } from '@modules/theme/helpers/menuPickPack';
import { optionsShipment } from '@modules/theme/helpers/menuShipment';
import { optionsReturn } from '@modules/theme/helpers/menuReturn';
import { optionsCatalog } from '@modules/theme/helpers/menuCatalog';
import { optionsInventory } from '@modules/theme/helpers/menuInventory';
import { optionsMasters } from '@modules/theme/helpers/menuMasters';
import { optionsMarketplace } from '@modules/theme/helpers/menuMarketplace';
import { optionsIntegration } from '@modules/theme/helpers/menuIntegration';
import { optionsVendor } from '@modules/theme/helpers/menuVendor';
import { optionsTada } from '@modules/theme/helpers/menuTada';
import { optionsReport } from '@modules/theme/helpers/menuReport';
import { optionsSupport } from '@modules/theme/helpers/menuSupport';
import { optionsConfigurations } from '@modules/theme/helpers/menuConfigurations';
import { optionsTools } from '@modules/theme/helpers/menuTools';
import { optionsUser } from '@modules/theme/helpers/menuUser';

export const helpersMenuList = (t) => [
    ...optionsDashboard(t),
    ...optionsOrder(t),
    ...optionsPickPack(t),
    ...optionsShipment(t),
    ...optionsReturn(t),
    ...optionsCatalog(t),
    ...optionsInventory(t),
    ...optionsMasters(t),
    ...optionsMarketplace(t),
    ...optionsIntegration(t),
    ...optionsVendor(t),
    ...optionsTada,
    ...optionsReport(t),
    ...optionsSupport(t),
    ...optionsConfigurations(t),
    ...optionsTools(t),
    ...optionsUser(t),
];
