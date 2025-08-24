import classes from './MeetupDetail.module.css';

function MeetupDetail({
  image,
  title,
  address,
  description,
  creator,
  createdAt,
  updatedAt,
}) {
  const createdDate = new Date(createdAt).toLocaleDateString('fi-FI');
  const updatedDate = new Date(updatedAt).toLocaleDateString('fi-FI');

  return (
    <section className={classes.detail}>
      <img src={image} alt={title} />
      <h1>{title}</h1>
      <address>{address}</address>
      <p>{description}</p>
      <div className={classes.timestamps}>
        <p>
          Creator: <strong>{creator.name}</strong>
        </p>
        <small>Created on: {createdDate}</small>
        {updatedDate !== createdDate && (
          <small>Updated on: {updatedDate}</small>
        )}
      </div>
    </section>
  );
}

export default MeetupDetail;
