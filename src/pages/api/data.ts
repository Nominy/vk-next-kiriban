import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { VK } from 'vk-io';

const vk = new VK({
  token: process.env.VK_TOKEN!,
});

interface UsersCount {
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
        value: response[0].members_count
      };
    } catch (err) {
      usersCount = {
        value: 'Error',
      };
    }
  } else {
    usersCount = {
      value: '',
    };
  }

  res.status(200).json(usersCount);
};

export default handler;
