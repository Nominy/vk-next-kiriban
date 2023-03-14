import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { VK } from 'vk-io';

const vk = new VK({
  token: process.env.VK_TOKEN!,
});

interface UsersCount {
  key: string;
  value: string | number;
}

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse<UsersCount>) => {
  const group = req.query.groups as string;
  let usersCount: UsersCount;

  if (Boolean(group)) {
    try {
      const response = await vk.api.groups.getById({
        group_id: group,
        fields: ['members_count'],
      });
      usersCount = {
        key: response[0].screen_name!,
        value: response[0].members_count,
      };
    } catch (err) {
      usersCount = {
        key: group,
        value: 'Error',
      };
    }
  } else {
    usersCount = {
      key: 'No group specified',
      value: '',
    };
  }

  res.status(200).json(usersCount);
};

export default handler;
