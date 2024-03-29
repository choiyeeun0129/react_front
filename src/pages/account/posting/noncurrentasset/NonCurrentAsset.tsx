import React from 'react'
import Layout from 'layout';
import { ReactElement } from 'react-markdown/lib/react-markdown';

const NonCurrentAsset = () => {
  return (
    <div>NonCurrentAsset</div>
  )
}


NonCurrentAsset.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
  };

export default NonCurrentAsset;
