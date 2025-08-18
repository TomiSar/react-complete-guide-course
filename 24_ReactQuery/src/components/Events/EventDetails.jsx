import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import Header from '../Header.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  deleteEvent,
  fetchEvent,
  formatDate,
  queryClient,
} from '../../utils/helpers.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { API_BASE_URL } from '../../utils/constants.js';
import { useState } from 'react';
import Modal from '../UI/Modal.jsx';

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });

  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeleting,
    error: errorDelete,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none',
      });
      navigate('/events');
    },
  });

  function handleDelete() {
    mutate({ id: params.id });
  }

  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleCancelDelete() {
    setIsDeleting(false);
  }

  let content;

  if (isPending) {
    content = (
      <div className='center' id='event-details-content'>
        <p>Fetching event data...</p>
      </div>
    );
  }

  if (isError) {
    content = (
      <div className='center' id='event-details-content'>
        <ErrorBlock
          title='Failed to load event'
          message={
            error.info?.message ||
            'Failed to fetch event data please try again.'
          }
        />
      </div>
    );
  }

  if (data) {
    const formattedDate = formatDate(data.date);
    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to='edit'>Edit</Link>
          </nav>
        </header>
        <div id='event-details-content'>
          <img src={`${API_BASE_URL}/${data.image}`} alt='' />
          <div id='event-details-info'>
            <div>
              <p id='event-details-location'>{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {formattedDate} @ {data.time}
              </time>
            </div>
            <p id='event-details-description'>{data.description}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isDeleting && (
        <Modal onClose={handleCancelDelete}>
          <h2>{`Are you sure you want to delete event ${data.title}?`}</h2>
          <p>This action is irreversible and cannot be undone.</p>
          <div className='form-actions'>
            {isPendingDeletion && <p>Deleting event, please wait...</p>}
            {!isPendingDeletion && (
              <>
                <button className='button-text' onClick={handleCancelDelete}>
                  Cancel
                </button>
                <button className='button' onClick={handleDelete}>
                  Delete
                </button>
              </>
            )}
          </div>
          {isErrorDeleting && (
            <ErrorBlock
              title='Failed to delete event'
              message={
                errorDelete.info?.message ||
                'Failed to delete event please try again.'
              }
            />
          )}
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to='/events' className='nav-item'>
          View all Events
        </Link>
      </Header>
      <article id='event-details'>{content}</article>
    </>
  );
}
