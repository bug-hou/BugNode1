class Statistic {
    constructor(text) {
        this.text = text;
        if (!this.judegType(text)) {
            throw "文本类型错误";
        }
        this.classifyData(text);
        this.coursesArray = [];
        this.coursesInfo.forEach((item) => {
            this.coursesArray.push(this.processing(item));
        });
    }
    // 判断传入文件的类型，如果不是字符串就返回false
    judegType(text) {
        if (typeof text !== "string") {
            return false;
        }
        return true;
    }
    // 对数据继续分类
    classifyData(text) {
        // 获取学生信息
        const userInfoReg =
            /(?<=id="Label[1-9]">(学号|姓名|学院|专业|行政班)：).*?(?=<\/span>)/g;

        // 获取请求的viewstate值
        const viewStateReg = /(?<=name="__VIEWSTATE" value=").*?(?=" \/>)/;

        // 获取课程信息
        const courseReg =
            /(?<=td align="Center.{0,30}?">)[^\s]{10,100}?(?=<\/td>)/gs;

        // 获取可选择的课程
        const selectYearReg = /(?<=<option.*?value=").*?(?=")/g;

        // 保存用户信息
        this.userInfo = {
            id: userInfoReg.exec(text)[0],
            name: userInfoReg.exec(text)[0],
            college: userInfoReg.exec(text)[0],
            major: userInfoReg.exec(text)[0],
            class: userInfoReg.exec(text)[0],
        };

        // 保存viewState的值
        this.viewStateValue = viewStateReg.exec(text)[0];

        // 可选择课程的值
        this.selectYearInfo = [];
        while (true) {
            const data = selectYearReg.exec(text);
            if (data) {
                this.selectYearInfo.push(data[0]);
            } else {
                break;
            }
        }

        this.coursesInfo = [];
        while (true) {
            const data = courseReg.exec(text);
            if (data) {
                this.coursesInfo.push(data[0]);
            } else {
                break;
            }
        }
    }
    // 处理课程信息
    processing(courseData) {
        const dataArr = courseData.split("<br>");
        var courseInfo = {
            name: dataArr[0],
            must: dataArr[1],
            time: {
                week: dataArr[2].slice(0, 2),
                duration: dataArr[2].slice(
                    dataArr[2].indexOf("{") + 1,
                    dataArr[2].indexOf("}")
                ),
                time: dataArr[2].slice(
                    dataArr[2].indexOf("第"),
                    dataArr[2].indexOf("节") + 1
                ),
            },
            teacher: dataArr[3],
            house: dataArr[4],
        };
        if (courseInfo.time.duration.includes("|")) {
            courseInfo.time.timer = courseInfo.time.duration.includes("单") ? 1 : 2;
        }
        return courseInfo;
    }
};

module.exports = {
    Statistic
}
