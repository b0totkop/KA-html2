import Sequelize from "sequelize";
const { DataTypes,Op } = Sequelize;

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./data/database.sqlite",
});

sequelize.authenticate().then(() => {
    console.log('Connection successful')
  }).catch((err) => {
    console.log('Error connectiog to database')
  })

  const Student = sequelize.define('students', {
    student_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [4, 20],
        }
    },
    favorite_class: {
        type: DataTypes.STRING(25),
        defaultValue: 'Computer Science',
    },
    school_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    has_language_examination: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

Student.sync()
.then(()=>{
   Student.bulkCreate([
        {name: 'ákos', favorite_class: 'Math', school_year: 2, has_language_examination: true},
        {name: 'béla', school_year: 1, has_language_examination: false},
        {name: 'virág', favorite_class: 'Math', school_year: 3, has_language_examination: false},
        {name: 'bálint', favorite_class: 'Biology', school_year: 2, has_language_examination: true},
    ])

    Student.findAll({
        attributes: ['name'],
        where: {
            [Op.or]: [
                { favorite_class: 'Computer Science' },
                { has_language_examination: true },
              ],
            },
    })
    .then((data) => {
		data.forEach((element) => {
      console.log(element.toJSON())
    })
	})

    Student.findAll({
        attributes: [
            'school_year',
            [sequelize.fn('COUNT', sequelize.col('student_id')), 'num_students'],
        ],
        group: ['school_year'],
    })
    .then((data) => {
		data.forEach((element) => {
      console.log(element.toJSON())
    })
	})
})