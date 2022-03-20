import { NextPage } from 'next';
import { CommonLayout } from 'src/components/layout/CommonLayout';
import { EditMyMenuPage } from 'src/components/page/EditPage';

const EditMyMenu: NextPage = () => {
  return (
    <CommonLayout>
      <EditMyMenuPage />
    </CommonLayout>
  );
};

export default EditMyMenu;
