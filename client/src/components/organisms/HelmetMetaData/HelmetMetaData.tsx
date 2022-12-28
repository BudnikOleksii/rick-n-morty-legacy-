import { FC } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import { CLIENT_URL } from '../../../constants';

interface Props {
  quote?: string;
  title?: string;
  image?: string;
  description?: string;
  hashtag?: string;
}

const SITENAME = 'Rick and Morty cards auction';
const DEFAULT_TITLE = 'Rick and Morty cards auction';
const DEFAULT_IMAGE =
  'https://www.freepnglogos.com/uploads/rick-and-morty-png/rick-and-morty-portal-shoes-white-clothing-zavvi-23.png';
const DEFAULT_DESCR =
  'Rick and Morty cards up. You can buy and sell cards in auction, collect cards and cards sets to increase your rating.';
const DEFAULT_HASHTAG = '#ricknmorty';

export const HelmetMetaData: FC<Props> = (props) => {
  const location = useLocation();
  const currentUrl = CLIENT_URL + location.pathname;
  const siteName = SITENAME;
  const quote = props.quote || '';
  const title = props.title || DEFAULT_TITLE;
  const image = props.image || DEFAULT_IMAGE;
  const description = props.description || DEFAULT_DESCR;
  const hashtag = props.hashtag || DEFAULT_HASHTAG;

  return (
    <Helmet>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="csrf_token" content="" />
      <meta property="type" content="website" />
      <meta property="url" content={currentUrl} />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="_token" content="" />
      <meta name="robots" content="noodp" />
      <meta property="title" content={title} />
      <meta property="quote" content={quote} />
      <meta name="description" content={description} />
      <meta property="image" content={image} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:quote" content={quote} />
      <meta property="og:hashtag" content={hashtag} />
      <meta property="og:image" content={image} />
      <meta content="image/*" property="og:image:type" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:description" content={description} />{' '}
    </Helmet>
  );
};
