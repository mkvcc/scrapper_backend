import { ApiProperty } from '@nestjs/swagger';

class SubPermissionDto {
  @ApiProperty()
  slug: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}

class PermissionDto {
  @ApiProperty()
  slug: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [SubPermissionDto], required: false })
  children?: SubPermissionDto[];
}

export class SyncPermissionsDto {
  @ApiProperty({
    type: [PermissionDto],
    example: [
      {
        slug: 'Permission1-slug',
        name: 'Permission1',
        description: 'Description of Permission 1',
        children: [
          {
            slug: 'subpermission1-slug',
            name: 'subpermission1-name',
            description: 'Description of Sub-Permission 1',
          },
          {
            slug: 'subpermission2-slug',
            name: 'subpermission2-name',
            description: 'Description of Sub-Permission 2',
          },
          {
            slug: 'subpermission3-slug',
            name: 'subpermission3-name',
            description: 'Description of Sub-Permission 1',
          },
          {
            slug: 'subpermission4-slug',
            name: 'subpermission4-name',
            description: 'Description of Sub-Permission 2',
          },
          {
            slug: 'subpermission5-slug',
            name: 'subpermission5-name',
            description: 'Description of Sub-Permission 1',
          },
          {
            slug: 'subpermission6-slug',
            name: 'subpermission6-name',
            description: 'Description of Sub-Permission 2',
          },
        ],
      },
      {
        slug: 'Permission2-slug',
        name: 'Permission2',
        description: 'Description of Permission 1',
        // children: [
        //   {
        //     slug: 'subpermission21-slug',
        //     name: 'subpermission21-name',
        //     description: 'Description of Sub-Permission 1',
        //     children: [
        //       {
        //         slug: 'subpermission21-slug',
        //         name: 'subpermission21-name',
        //         description: 'Description of Sub-Permission 1',
        //         children: [
        //           {
        //             slug: 'subpermission21-slug',
        //             name: 'subpermission21-name',
        //             description: 'Description of Sub-Permission 1',
        //           },
        //           {
        //             slug: 'subpermission22-slug',
        //             name: 'subpermission22-name',
        //             description: 'Description of Sub-Permission 2',
        //           },
        //           {
        //             slug: 'subpermission23-slug',
        //             name: 'subpermission23-name',
        //             description: 'Description of Sub-Permission 3',
        //             children: [
        //               {
        //                 slug: 'subpermission21-slug',
        //                 name: 'subpermission21-name',
        //                 description: 'Description of Sub-Permission 1',
        //               },
        //               {
        //                 slug: 'subpermission22-slug',
        //                 name: 'subpermission22-name',
        //                 description: 'Description of Sub-Permission 2',
        //               },
        //               {
        //                 slug: 'subpermission23-slug',
        //                 name: 'subpermission23-name',
        //                 description: 'Description of Sub-Permission 3',
        //               },
        //             ],
        //           },
        //         ],
        //       },
        //       {
        //         slug: 'subpermission22-slug',
        //         name: 'subpermission22-name',
        //         description: 'Description of Sub-Permission 2',
        //       },
        //       {
        //         slug: 'subpermission23-slug',
        //         name: 'subpermission23-name',
        //         description: 'Description of Sub-Permission 3',
        //       },
        //     ],
        //   },
        //   {
        //     slug: 'subpermission22-slug',
        //     name: 'subpermission22-name',
        //     description: 'Description of Sub-Permission 2',
        //   },
        //   {
        //     slug: 'subpermission23-slug',
        //     name: 'subpermission23-name',
        //     description: 'Description of Sub-Permission 3',
        //   },
        //   {
        //     slug: 'subpermission24-slug',
        //     name: 'subpermission24-name',
        //     description: 'Description of Sub-Permission 4',
        //   },
        //   {
        //     slug: 'subpermission25-slug',
        //     name: 'subpermission25-name',
        //     description: 'Description of Sub-Permission 5',
        //   },
        //   {
        //     slug: 'subpermission26-slug',
        //     name: 'subpermission26-name',
        //     description: 'Description of Sub-Permission 6',
        //   },
        // ],
      },
    ],
  })
  permissionData: PermissionDto[];

  @ApiProperty({ type: String, example: 'Microservice_name' })
  type: string;
}
