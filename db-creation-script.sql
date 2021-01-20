CREATE TABLE crop2ml_ModelUnit (
  modelUnitId varchar(255) notnull,
  name varchar(255) notnull,
  timestep varchar(255) notnull,
  version varchar(255) notnull,
  
  descriptionId varchar(255) notnull,

  PRIMARY KEY (modelid) 
);

CREATE TABLE crop2ml_Description (
  descriptionId,
  title varchar(255),
  instituttion varchar(255),
  
);



CREATE TABLE crop2ml_DescriptionToAuthor(
  descriptionId varchar(255),
  authorId varchar(255),
);

CREATE TABLE crop2ml_Author(
  titleId varchar(255)
  
);


CREATE TABLE crop2ml_Title(
  titleId varchar(255)
  
);








#  create table  modifiedweekmetrics
CREATE TABLE  modifiedweekmetrics ( 
  dataUserEMail varchar(50)
  , dataOwnerEMail varchar(50)
  , parcelName varchar(50)
  , yearNumber int(11)
  , weekNumber int(11)
  , nbObsFullGrowth int(11)
  , nbObsSlowGrowth int(11)
  , nbObsStoppedGrowth int(11)
  , dateTimeInMs int(11)
  , PRIMARY KEY (dataUserEMail, dataOwnerEMail, parcelName, yearNumber, weekNumber) 
);

