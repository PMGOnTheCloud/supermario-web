export function createDashboardLayer(font) {
    return function drawDashboard(context) {
        font.print('Mario', context, 16, 8);
    }
}