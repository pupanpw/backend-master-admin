import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupDetail } from '../entity/group-detail.entity';
import { CreateGroupDto } from '../dto/create-group-detail.dto';

@Injectable()
export class ExternalWebhookLineService {
  constructor(
    @InjectRepository(GroupDetail)
    private groupDetailRepository: Repository<GroupDetail>,
  ) {}

  public async webHook(input: any) {
    const events = input.events;
    events.forEach((event: any) => {
      if (event.source.type === 'group') {
        console.log(event.source);
        this.createGroupDetail(event.source);
      }
    });
  }

  private async createGroupDetail(groupDetail: CreateGroupDto) {
    const prepareGroupDetail = new GroupDetail();
    prepareGroupDetail.group_id = groupDetail.groupId;
    prepareGroupDetail.group_name = groupDetail.type;
    prepareGroupDetail.created_by = groupDetail.userId;

    const groupDetailDb = await this.groupDetailRepository.findOne({
      where: { group_id: groupDetail.groupId },
    });
    if (groupDetailDb === null) {
      const createGroupDetail = await this.groupDetailRepository.save(
        prepareGroupDetail,
      );
      console.log('Create Success !', createGroupDetail);
    } else {
      console.log('Duplicate', groupDetailDb);
    }
  }
}
