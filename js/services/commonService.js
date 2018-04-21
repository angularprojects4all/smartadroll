freedocastAdmin.service('commonService', ['$http', '$rootScope', '$filter', function ($http, $rootScope, $filter) {

    this.changeExport = function (tableId, eType, fileName) {
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
            fileName: fileName
        });
    };

    this.loadPlayer = function (playerId, streamUrl, logoObj) {
        jwplayer(playerId).setup({
            wmode: 'transparent',
            primary: 'html5',
            playlist: [{
                file: streamUrl,
            }],
            logo: {
                file: logoObj.logo,
                position: logoObj.position
            }, //top-left,  top-right,bottom-right,bottom-left
            abouttext: "Freedocast.com",
            aboutlink: "https://www.freedocast.com",
            width: "100%",
            autostart: "true",
            stretching: "uniform",
            aspectratio: "9:5",
            controlbar: 'bottom',
            skin: {
                name: "six"
            },
            events: {
                onPlay: function () {
                    $rootScope.isPlaying = true;
                    setPlayerLogo(logoObj);
                }
            }
        });
    };

    this.getLogoStyle = function (logoDetails) {
        if (logoDetails.fullBackgroundLogo) {
            return { "width": "100%", "height": "100%" };
        }
        else {
            if (logoDetails.enableLogoHeightWidth) {
                return {
                    "top": logoDetails.position == 'top-left' || logoDetails.position == 'top-right' ? logoDetails.logoTopBottomMargin + "%" : undefined,
                    "bottom": logoDetails.position == 'bottom-left' || logoDetails.position == 'bottom-right' ? logoDetails.logoTopBottomMargin + "%" : undefined,
                    "right": logoDetails.position == 'bottom-right' || logoDetails.position == 'top-right' ? logoDetails.logoLeftRightMargin + "%" : undefined,
                    "left": logoDetails.position == 'bottom-left' || logoDetails.position == 'top-left' ? logoDetails.logoLeftRightMargin + "%" : undefined,
                    "width": logoDetails.logoWidth + '%',
                    "height": logoDetails.logoHeight + '%'
                };
            }
            else return {
                "top": logoDetails.position == 'top-left' || logoDetails.position == 'top-right' ? logoDetails.logoTopBottomMargin + "%" : undefined,
                "bottom": logoDetails.position == 'bottom-left' || logoDetails.position == 'bottom-right' ? logoDetails.logoTopBottomMargin + "%" : undefined,
                "right": logoDetails.position == 'bottom-right' || logoDetails.position == 'top-right' ? logoDetails.logoLeftRightMargin + "%" : undefined,
                "left": logoDetails.position == 'bottom-left' || logoDetails.position == 'top-left' ? logoDetails.logoLeftRightMargin + "%" : undefined,
            };
        }
    };

    function setPlayerLogo(branding) {
        if (branding.fullBackgroundLogo == true || branding.fullBackgroundLogo == 'true') {
            $('.jw-logo').css("width", "100%");
            $('.jw-logo').css('min-width', '100%');
            $('.jw-logo').css('min-height', '100%');
            $('.jw-logo').css('max-width', '100%');
            $('.jw-logo').css('max-height', '100%');
            $('.jw-logo').css("height", "100%");
            $('.jw-logo').css("background-size", "100% 100%");
            $('.jw-logo').css("top", 0); $('.jw-logo').css("bottom", 0);
            $('.jw-logo').css("left", 0); $('.jw-logo').css("right", 0);
        }
        else {
            $('.jw-logo.jw-logo-top-left').css("top", branding.logoTopBottomMargin + '%');
            $('.jw-logo.jw-logo-top-left').css("left", branding.logoLeftRightMargin + '%');
            $('.jw-logo.jw-logo-top-right').css("top", branding.logoTopBottomMargin + '%');
            $('.jw-logo.jw-logo-top-right').css("right", branding.logoLeftRightMargin + '%');
            $('.jw-logo.jw-logo-bottom-left').css("bottom", branding.logoTopBottomMargin + '%');
            $('.jw-logo.jw-logo-bottom-left').css("left", branding.logoLeftRightMargin + '%');
            $('.jw-logo.jw-logo-bottom-right').css("bottom", branding.logoTopBottomMargin + '%');
            $('.jw-logo.jw-logo-bottom-right').css("right", branding.logoLeftRightMargin + '%');

            if (branding.enableLogoHeightWidth) {
                $('.jw-logo').css("width", branding.logoWidth + '%');
                $('.jw-logo').css('min-width', branding.logoWidth + '%');
                $('.jw-logo').css('max-width', branding.logoWidth + '%');
                $('.jw-logo').css('min-height', branding.logoHeight + '%');
                $('.jw-logo').css('max-height', branding.logoHeight + '%');
                $('.jw-logo').css("height", branding.logoHeight + '%');
                $('.jw-logo').css("background-size", "100% 100%");
            }
        }
    };

    this.today = function () {
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var output = (('' + day).length < 2 ? '0' : '') + day + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + d.getFullYear();
        return output;
    };

    this.startToday = function () {
        var output = this.today();
        return moment(output, "DD/MM/YYYY").unix() * 1000;
    };

    this.endToday = function () {
        var output = this.today();
        return (moment(output, "DD/MM/YYYY").unix()) * 1000 + (23 * 60 * 60 + 59 * 60 + 59) * 1000;
    };

    this.thisWeek = function () {
        var d = new Date();
        return this.setDay(d, 1, true);
    };

    this.setDay = function (d, day, week_starts_monday) {
        var c_day = d.getDay();
        if (week_starts_monday && c_day === 0) c_day = 7;
        d.setDate(d.getDate() - c_day + day);
        var output = $filter('date')(d, 'dd/MM/yyyy');
        return moment(output, "DD/MM/YYYY").unix() * 1000
    };

    this.thisMonth = function () {
        var output = $filter('date')(new Date(new Date().getFullYear(), new Date().getMonth(), 1), 'dd/MM/yyyy');
        return moment(output, "DD/MM/YYYY").unix() * 1000;
    };

    this.startDatePicker = function () {
        $(".fromDate").datetimepicker({
            format: "DD/MM/YYYY",
            maxDate: moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
            useCurrent: false,
            ignoreReadonly: true
        }).on('dp.change', function (e) {
            //$rootScope.startDate = $('.fromDate input').val();
            e.preventDefault();
            e.stopPropagation();
        });
    };

    this.endDatePicker = function () {
        $(".toDate").datetimepicker({
            format: "DD/MM/YYYY",
            maxDate: moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
            useCurrent: false,
            ignoreReadonly: true
        }).on('dp.change', function (e) {
            // $rootScope.endDate = $('.toDate input').val();
            e.preventDefault();
            e.stopPropagation();
        });
    };

    this.startDatePickerWithMin = function (mode) {
        $(".fromDate").datetimepicker({
            format: "DD/MM/YYYY",
            minDate: moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
            useCurrent: false,
            ignoreReadonly: true
        }).on('dp.change', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
    };

    this.endDatePickerWithMin = function (mode) {
        $(".toDate").datetimepicker({
            format: "DD/MM/YYYY",
            minDate: moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
            useCurrent: false,
            ignoreReadonly: true
        }).on('dp.change', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
    };

    this.loadjscssfile = function (filename, filetype) {
        if (filetype == "js") { //if filename is a external JavaScript file
            var fileref = document.createElement('script')
            fileref.setAttribute("type", "text/javascript")
            fileref.setAttribute("src", filename)
        }
        else if (filetype == "css") { //if filename is an external CSS file
            var fileref = document.createElement("link")
            fileref.setAttribute("rel", "stylesheet")
            fileref.setAttribute("type", "text/css")
            fileref.setAttribute("href", filename)
        }
        if (typeof fileref != "undefined")
            document.getElementsByTagName("head")[0].appendChild(fileref)
    };

    this.loadPlayer = function (playerId, streamUrl, logoObj) {
        jwplayer(playerId).setup({
            wmode: 'transparent',
            primary: 'html5',
            playlist: [{
                file: streamUrl,
            }],
            logo: {
                file: logoObj.logo,
                position: logoObj.position
            }, //top-left,  top-right,bottom-right,bottom-left
            abouttext: "Freedocast.com",
            aboutlink: "https://www.freedocast.com",
            width: "100%",
            autostart: "true",
            stretching: "uniform",
            aspectratio: "9:5",
            controlbar: 'bottom',
            skin: {
                name: "six"
            },
            events: {
                onPlay: function () {
                    $rootScope.isPlaying = true;
                    setPlayerLogo(logoObj);
                }
            }
        });
    };

    this.getLogoStyle = function (logoDetails) {
        if (logoDetails.fullBackgroundLogo) {
            return { "width": "100%", "height": "100%" };
        }
        else {
            if (logoDetails.enableLogoHeightWidth) {
                return {
                    "top": logoDetails.position == 'top-left' || logoDetails.position == 'top-right' ? logoDetails.logoTopBottomMargin + "%" : undefined,
                    "bottom": logoDetails.position == 'bottom-left' || logoDetails.position == 'bottom-right' ? logoDetails.logoTopBottomMargin + "%" : undefined,
                    "right": logoDetails.position == 'bottom-right' || logoDetails.position == 'top-right' ? logoDetails.logoLeftRightMargin + "%" : undefined,
                    "left": logoDetails.position == 'bottom-left' || logoDetails.position == 'top-left' ? logoDetails.logoLeftRightMargin + "%" : undefined,
                    "width": logoDetails.logoWidth + '%',
                    "height": logoDetails.logoHeight + '%'
                };
            }
            else return {
                "top": logoDetails.position == 'top-left' || logoDetails.position == 'top-right' ? logoDetails.logoTopBottomMargin + "%" : undefined,
                "bottom": logoDetails.position == 'bottom-left' || logoDetails.position == 'bottom-right' ? logoDetails.logoTopBottomMargin + "%" : undefined,
                "right": logoDetails.position == 'bottom-right' || logoDetails.position == 'top-right' ? logoDetails.logoLeftRightMargin + "%" : undefined,
                "left": logoDetails.position == 'bottom-left' || logoDetails.position == 'top-left' ? logoDetails.logoLeftRightMargin + "%" : undefined,
            };
        }
    };

    function setPlayerLogo(branding) {
        if (branding.fullBackgroundLogo == true || branding.fullBackgroundLogo == 'true') {
            $('.jw-logo').css("width", "100%");
            $('.jw-logo').css('min-width', '100%');
            $('.jw-logo').css('min-height', '100%');
            $('.jw-logo').css('max-width', '100%');
            $('.jw-logo').css('max-height', '100%');
            $('.jw-logo').css("height", "100%");
            $('.jw-logo').css("background-size", "100% 100%");
            $('.jw-logo').css("top", 0); $('.jw-logo').css("bottom", 0);
            $('.jw-logo').css("left", 0); $('.jw-logo').css("right", 0);
        }
        else {
            $('.jw-logo.jw-logo-top-left').css("top", branding.logoTopBottomMargin + '%');
            $('.jw-logo.jw-logo-top-left').css("left", branding.logoLeftRightMargin + '%');
            $('.jw-logo.jw-logo-top-right').css("top", branding.logoTopBottomMargin + '%');
            $('.jw-logo.jw-logo-top-right').css("right", branding.logoLeftRightMargin + '%');
            $('.jw-logo.jw-logo-bottom-left').css("bottom", branding.logoTopBottomMargin + '%');
            $('.jw-logo.jw-logo-bottom-left').css("left", branding.logoLeftRightMargin + '%');
            $('.jw-logo.jw-logo-bottom-right').css("bottom", branding.logoTopBottomMargin + '%');
            $('.jw-logo.jw-logo-bottom-right').css("right", branding.logoLeftRightMargin + '%');

            if (branding.enableLogoHeightWidth) {
                $('.jw-logo').css("width", branding.logoWidth + '%');
                $('.jw-logo').css('min-width', branding.logoWidth + '%');
                $('.jw-logo').css('max-width', branding.logoWidth + '%');
                $('.jw-logo').css('min-height', branding.logoHeight + '%');
                $('.jw-logo').css('max-height', branding.logoHeight + '%');
                $('.jw-logo').css("height", branding.logoHeight + '%');
                $('.jw-logo').css("background-size", "100% 100%");
            }
        }
    };

    this.today = function () {
        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var output = (('' + day).length < 2 ? '0' : '') + day + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + d.getFullYear();
        return output;
    };

    this.startToday = function () {
        var output = this.today();
        return moment(output, "DD/MM/YYYY").unix() * 1000;
    };

    this.endToday = function () {
        var output = this.today();
        return (moment(output, "DD/MM/YYYY").unix()) * 1000 + (23 * 60 * 60 + 59 * 60 + 59) * 1000;
    };

    this.thisWeek = function () {
        var d = new Date();
        return this.setDay(d, 1, true);
    };

    this.setDay = function (d, day, week_starts_monday) {
        var c_day = d.getDay();
        if (week_starts_monday && c_day === 0) c_day = 7;
        d.setDate(d.getDate() - c_day + day);
        var output = $filter('date')(d, 'dd/MM/yyyy');
        return moment(output, "DD/MM/YYYY").unix() * 1000
    };

    this.thisMonth = function () {
        var output = $filter('date')(new Date(new Date().getFullYear(), new Date().getMonth(), 1), 'dd/MM/yyyy');
        return moment(output, "DD/MM/YYYY").unix() * 1000;
    };

    this.startDatePicker = function () {
        $(".fromDate").datetimepicker({
            format: "DD/MM/YYYY",
            maxDate: moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
            useCurrent: false,
            ignoreReadonly: true
        }).on('dp.change', function (e) {
            //$rootScope.startDate = $('.fromDate input').val();
            e.preventDefault();
            e.stopPropagation();
        });
    };

    this.endDatePicker = function () {
        $(".toDate").datetimepicker({
            format: "DD/MM/YYYY",
            maxDate: moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
            useCurrent: false,
            ignoreReadonly: true
        }).on('dp.change', function (e) {
            // $rootScope.endDate = $('.toDate input').val();
            e.preventDefault();
            e.stopPropagation();
        });
    };

    this.startDatePickerWithMin = function (mode) {
        $(".fromDate").datetimepicker({
            format: "DD/MM/YYYY",
            minDate: moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
            useCurrent: false,
            ignoreReadonly: true
        }).on('dp.change', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
    };

    this.endDatePickerWithMin = function (mode) {
        $(".toDate").datetimepicker({
            format: "DD/MM/YYYY",
            minDate: moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
            useCurrent: false,
            ignoreReadonly: true
        }).on('dp.change', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
    };

    this.loadjscssfile = function (filename, filetype) {
        if (filetype == "js") { //if filename is a external JavaScript file
            var fileref = document.createElement('script')
            fileref.setAttribute("type", "text/javascript")
            fileref.setAttribute("src", filename)
        }
        else if (filetype == "css") { //if filename is an external CSS file
            var fileref = document.createElement("link")
            fileref.setAttribute("rel", "stylesheet")
            fileref.setAttribute("type", "text/css")
            fileref.setAttribute("href", filename)
        }
        if (typeof fileref != "undefined")
            document.getElementsByTagName("head")[0].appendChild(fileref)
    };

    this.sendModule = function (state, params) {
        switch (state) {
            case 'home.home': return 'Pro_Accounts'; break;
            case 'home.broadcasts': return 'Pro_Broadcasts'; break;
            case 'home.devices': return 'Devices'; break;
            case 'home.plans': return 'Plans'; break;
            case 'home.offers': return 'Campaigns_Offer'; break;
            case 'home.akamai': return 'Akamai_Code'; break;
            case 'home.distributors': return 'Distributors'; break;
            case 'home.versions': return 'Versions_App'; break;
            case 'home.firmware': return 'Versions_FirmWare_Notification'; break;
            case 'home.users': if (params == 'ft') return 'Free_Trail_Users'; else if (params == 'reg') return 'Registered_Users'; else return 'Paid_Users'; break;
            case 'home.tickets': return 'Request_Demo'; break;
            case 'home.campaigns': return 'Campaigns_Marketing'; break;
            case 'home.resellers': return 'Campaigns_Resellers'; break;
            case 'home.premiumOffer': return 'Campaigns_Premium_Offer'; break;
            case 'home.reports': return 'Reports_New'; break;
            case 'home.oldReports': return 'Reports_Old'; break;
            case 'home.roles': return 'Roles_Roles'; break;
            case 'home.userVideos' : return 'User_Videos'; break;
            case 'home.userEventVideos' : return 'User_Videos'; break;
            case 'home.userEvents' : return 'User_Events'; break;
            case 'home.userReports' : return 'Reports_New_Users'; break;
            case 'home.userOldReports' : return 'Reports_Old_Users'; break;
            case 'home.appInApp' : return 'App_in_app'; break;
            case 'home.appInApp.dashboard' : return 'AIA_Account'; break;
            case 'home.appInApp.addVideos' : return 'AIA_Videos'; break;
            case 'home.appInApp.addUsers' : return 'AIA_Account'; break;
            // case 'home.appInApp.userVideos' : return 'AIA_Videos'; break;
            case 'home.appInApp.preview' : return 'AIA_Preview'; break;
        }
    };

}]);