import { Controller, Get, Param, Res, Header } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Get(':filename')
    async serveFile(@Param('filename') filename: string, @Res() res: Response) {
        const file = await this.filesService.getFileByName(filename);
        if (!file) {
            res.status(404).send('File not found');
            return;
        }

        const filePath = join(process.cwd(), `./files/${file.path}`);
        const fileStream = createReadStream(filePath);

        fileStream.on('error', (err) => {
            res.status(500).send('Error reading file');
        });

        fileStream.pipe(res);
    }
}
