smartAdRoll.service('exportService', ['$http', '$rootScope', '$filter', function ($http, $rootScope, $filter) {
this.export = function (tableId, eType, fileName, excludeColumns) {
    var formatType;
    switch (eType) {
        case 'Excel':
            formatType = 'excel';
            break;
        case 'Doc':
            formatType = 'doc';
            break;
        case 'PDF':
            formatType = 'pdf';
            break;
        case 'CSV':
            formatType = 'csv';
            break;
        default:
            break;
    }
    $('#' + tableId).tableExport({
        type: formatType,
        escape: 'true',
        fileName: fileName,
        excludeColumns: excludeColumns
    });
};  
}]);