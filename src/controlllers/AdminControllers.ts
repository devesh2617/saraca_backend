import { NextFunction, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
const prisma = new PrismaClient();

const addWhitePaper = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { title, content, description, date } = req.body

    const wpFound = await prisma.whitePaper.findFirst({
        where: { title }
    })

    if (wpFound) {
        const error: any = new Error("White Paper with same title already exists in the database")
        error.status = 409
        return next(error)
    }
    const file = req.files.img;
    const pdfFile = req.files.pdf;
    const pdffilename = Date.now() + "__" + pdfFile.name;
    const pdffilepath = path.join(__dirname, `../../public/images/whitePapers/pdf/${pdffilename}`)
    const filename = Date.now() + "__" + file.name;
    const filepath = path.join(__dirname, `../../public/images/whitePapers/img/${filename}`)

    fs.promises.copyFile(file.path, filepath)
        .then(() => {
            fs.promises.copyFile(pdfFile.path, pdffilepath).then(async () => {
                await prisma.whitePaper.create({
                    data: {
                        title,
                        content,
                        description,
                        date,
                        img: `${process.env.BACKEND_SITE_URL}/images/whitePapers/img/${filename}`,
                        pdf: `${process.env.BACKEND_SITE_URL}/images/whitePapers/pdf/${pdffilename}`
                    }
                })
                res.status(201).json({
                    message: "WhitePaper created successfully"
                })
            }).catch(() => {
                const error: any = new Error('Error uploading pdf file')
                error.status = 500
                return next(error)
            })
        })
        .catch(() => {
            const error: any = new Error('Error uploading img file')
            error.status = 500
            return next(error)
        });
})

const addCaseStudy = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { title, project_scope, project_deliverables, key_tools, customer } = req.body

    const csFound = await prisma.caseStudy.findFirst({
        where: { title }
    })

    if (csFound) {
        const error: any = new Error("CaseStudy with same title already exists in the database")
        error.status = 409
        return next(error)
    }
    const file = req.files.img;

    const filename = Date.now() + "__" + file.name;
    const filepath = path.join(__dirname, `../../public/images/caseStudies/${filename}`)

    fs.promises.copyFile(file.path, filepath)
        .then(async () => {
            await prisma.caseStudy.create({
                data: {
                    title,
                    project_scope,
                    project_deliverables,
                    key_tools,
                    customer,
                    img: `${process.env.BACKEND_SITE_URL}/images/caseStudies/${filename}`
                }
            })
            res.status(201).json({
                message: "CaseStudy created successfully"
            })
        })
        .catch(() => {
            const error: any = new Error('Error uploading file')
            error.status = 500
            next(error)
        });
})

const addNews = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { title, description, date, link } = req.body

    const newsFound = await prisma.news.findFirst({
        where: { title }
    })
    if (newsFound) {
        const error: any = new Error("News with same title already exists in the database")
        error.status = 409
        return next(error)
    }

    const file = req.files.img;
    const filename = Date.now() + "__" + file.name;
    const filepath = path.join(__dirname, `../../public/images/news/${filename}`)

    fs.promises.copyFile(file.path, filepath)
        .then(async () => {
            await prisma.news.create({
                data: {
                    title,
                    link,
                    description,
                    date,
                    img: `${process.env.BACKEND_SITE_URL}/images/news/${filename}`
                }
            })
            res.status(201).json({
                message: "News created successfully"
            })
        })
        .catch(() => {
            const error: any = new Error('Error uploading file')
            error.status = 500
            next(error)
        });

})

const addWebinar = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { title, link } = req.body

    const webinarFound = await prisma.webinar.findFirst({
        where: { title }
    })
    if (webinarFound) {
        const error: any = new Error("Webinar with same title already exists in the database")
        error.status = 409
        return next(error)
    }

    const file = req.files.img;
    const filename = Date.now() + "__" + file.name;
    const filepath = path.join(__dirname, `../../public/images/webinars/${filename}`)

    fs.promises.copyFile(file.path, filepath)
        .then(async () => {
            await prisma.webinar.create({
                data: {
                    title,
                    link,
                    img: `${process.env.BACKEND_SITE_URL}/images/webinars/${filename}`
                }
            })
            res.status(201).json({
                message: "Webinar created successfully"
            })
        })
        .catch(() => {
            const error: any = new Error('Error uploading file')
            error.status = 500
            next(error)
        });

})

const addBlog = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { title, content } = req.body

    const blogFound = await prisma.blog.findFirst({
        where: { title }
    })
    if (blogFound) {
        const error: any = new Error("Blog post with same title already exists in the database")
        error.status = 409
        return next(error)
    }

    const file = req.files.img;
    const filename = Date.now() + "__" + file.name;
    const filepath = path.join(__dirname, `../../public/images/blogs/${filename}`)

    fs.promises.copyFile(file.path, filepath)
        .then(async () => {
            await prisma.blog.create({
                data: {
                    title,
                    content,
                    img: `${process.env.BACKEND_SITE_URL}/images/blogs/${filename}`
                }
            })
            res.status(201).json({
                message: "Blog post created successfully"
            })
        })
        .catch(() => {
            const error: any = new Error('Error uploading file')
            error.status = 500
            next(error)
        });

})

const editWhitePaper = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { title, content, description, date } = req.body;
    const { id } = req.params;

    const wpFound = await prisma.whitePaper.findFirst({
        where: { id }
    });

    if (!wpFound) {
        const error: any = new Error("White Paper doesn't exist");
        error.status = 404;
        return next(error);
    }

    const file = req.files?.img;
    const pdfFile = req.files?.pdf;

    try {
        if (file) {
            const filename = Date.now() + "__" + file.name;
            const filepath = path.join(__dirname, `../../public/images/whitePapers/img/${filename}`);

            await fs.promises.copyFile(file.path, filepath);

            if (wpFound.img) {
                fs.rmSync(path.join(__dirname, `../../public/images/whitePapers/img/${wpFound.img.split("/")[wpFound.img.split("/").length - 1]}`));
            }

            await prisma.whitePaper.update({
                where: { id },
                data: {
                    img: `${process.env.BACKEND_SITE_URL}/images/whitePapers/img/${filename}`
                }
            });
        }

        if (pdfFile) {
            const pdffilename = Date.now() + "__" + pdfFile.name;
            const pdffilepath = path.join(__dirname, `../../public/images/whitePapers/pdf/${pdffilename}`);

            await fs.promises.copyFile(pdfFile.path, pdffilepath);

            if (wpFound.pdf) {
                fs.rmSync(path.join(__dirname, `../../public/images/whitePapers/pdf/${wpFound.pdf.split("/")[wpFound.pdf.split("/").length - 1]}`));
            }

            await prisma.whitePaper.update({
                where: { id },
                data: {
                    pdf: `${process.env.BACKEND_SITE_URL}/images/whitePapers/pdf/${pdffilename}`,
                    title,
                    description,
                    content,
                    date
                }
            });
        }

        res.status(201).json({
            message: "White Paper edited successfully"
        });
    } catch (error) {
        console.error(error);
        const err: any = new Error('Error processing request');
        err.status = 500;
        return next(err);
    }
});

const editBlog = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { title, content } = req.body;
    const { id } = req.params;

    const blogFound = await prisma.blog.findFirst({
        where: { id }
    });

    if (!blogFound) {
        const error: any = new Error("Blog post doesn't exist");
        error.status = 404;
        return next(error);
    }

    const file = req.files?.img;

    try {
        if (file) {
            const filename = Date.now() + "__" + file.name;
            const filepath = path.join(__dirname, `../../public/images/blogs/${filename}`);

            await fs.promises.copyFile(file.path, filepath);

            if (blogFound.img) {
                fs.rmSync(path.join(__dirname, `../../public/images/blogs/${blogFound.img.split("/")[blogFound.img.split("/").length - 1]}`));
            }

            await prisma.blog.update({
                where: { id },
                data: {
                    img: `${process.env.BACKEND_SITE_URL}/images/blogs/${filename}`,
                    title,
                    content
                }
            });
        } else {
            // If no new image is provided, just update the title and content
            await prisma.blog.update({
                where: { id },
                data: {
                    title,
                    content
                }
            });
        }

        res.status(200).json({
            message: "Blog post edited successfully"
        });
    } catch (error) {
        console.error(error);
        const err: any = new Error('Error processing request');
        err.status = 500;
        return next(err);
    }
});

const editWebinar = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { title, link } = req.body;
    const { id } = req.params;

    const webinarFound = await prisma.webinar.findFirst({
        where: { id }
    });

    if (!webinarFound) {
        const error: any = new Error("Webinar doesn't exist");
        error.status = 404;
        return next(error);
    }

    const file = req.files?.img;

    try {
        if (file) {
            const filename = Date.now() + "__" + file.name;
            const filepath = path.join(__dirname, `../../public/images/webinars/${filename}`);

            await fs.promises.copyFile(file.path, filepath);

            if (webinarFound.img) {
                fs.rmSync(path.join(__dirname, `../../public/images/webinars/${webinarFound.img.split("/")[webinarFound.img.split("/").length - 1]}`));
            }

            await prisma.webinar.update({
                where: { id },
                data: {
                    img: `${process.env.BACKEND_SITE_URL}/images/webinars/${filename}`,
                    title,
                    link
                }
            });
        } else {
            // If no new image is provided, just update the title and link
            await prisma.webinar.update({
                where: { id },
                data: {
                    title,
                    link
                }
            });
        }

        res.status(200).json({
            message: "Webinar edited successfully"
        });
    } catch (error) {
        console.error(error);
        const err: any = new Error('Error processing request');
        err.status = 500;
        return next(err);
    }
});

const editNews = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { title, description, date, link } = req.body;
    const { id } = req.params;

    const newsItemFound = await prisma.news.findFirst({
        where: { id }
    });

    if (!newsItemFound) {
        const error: any = new Error("News item doesn't exist");
        error.status = 404;
        return next(error);
    }

    const file = req.files?.img;

    try {
        if (file) {
            const filename = Date.now() + "__" + file.name;
            const filepath = path.join(__dirname, `../../public/images/news/${filename}`);

            await fs.promises.copyFile(file.path, filepath);

            if (newsItemFound.img) {
                fs.rmSync(path.join(__dirname, `../../public/images/news/${newsItemFound.img.split("/")[newsItemFound.img.split("/").length - 1]}`));
            }

            await prisma.news.update({
                where: { id },
                data: {
                    img: `${process.env.BACKEND_SITE_URL}/images/news/${filename}`,
                    title,
                    description,
                    date,
                    link
                }
            });
        } else {
            // If no new image is provided, just update the title, description, date, and link
            await prisma.news.update({
                where: { id },
                data: {
                    title,
                    description,
                    date,
                    link
                }
            });
        }

        res.status(200).json({
            message: "News item edited successfully"
        });
    } catch (error) {
        console.error(error);
        const err: any = new Error('Error processing request');
        err.status = 500;
        return next(err);
    }
});

const deleteCaseStudy = asyncHandler(async (req: any, res: Response, next: NextFunction) => {  
    const { id } = req.params;

    const caseStudyFound = await prisma.caseStudy.findFirst({
        where: { id }
    });

    if (!caseStudyFound) {
        const error: any = new Error("Case study doesn't exist");
        error.status = 404;
        return next(error);
    }
    
    await prisma.caseStudy.delete({
        where:{id}
    })

    res.status(200).json({
        message: 'Case study deleted successfully'
    })
    
});

const deleteWhitePaper = asyncHandler(async (req: any, res: Response, next: NextFunction) => {  
    const { id } = req.params;

    const whitePaperFound = await prisma.whitePaper.findFirst({
        where: { id }
    });

    if (!whitePaperFound) {
        const error: any = new Error("White Paper doesn't exist");
        error.status = 404;
        return next(error);
    }
    
    await prisma.whitePaper.delete({
        where:{id}
    })

    res.status(200).json({
        message: 'White Paper deleted successfully'
    })
    
});

const deleteBlog = asyncHandler(async (req: any, res: Response, next: NextFunction) => {  
    const { id } = req.params;

    const blogFound = await prisma.blog.findFirst({
        where: { id }
    });

    if (!blogFound) {
        const error: any = new Error("Blog doesn't exist");
        error.status = 404;
        return next(error);
    }
    
    await prisma.blog.delete({
        where:{id}
    })

    res.status(200).json({
        message: 'Blog deleted successfully'
    })
    
});

const deleteNews = asyncHandler(async (req: any, res: Response, next: NextFunction) => {  
    const { id } = req.params;

    const newsFound = await prisma.news.findFirst({
        where: { id }
    });

    if (!newsFound) {
        const error: any = new Error("News doesn't exist");
        error.status = 404;
        return next(error);
    }
    
    await prisma.news.delete({
        where:{id}
    })

    res.status(200).json({
        message: 'News deleted successfully'
    })
    
});

const deleteWebinar = asyncHandler(async (req: any, res: Response, next: NextFunction) => {  
    const { id } = req.params;

    const webinarFound = await prisma.webinar.findFirst({
        where: { id }
    });

    if (!webinarFound) {
        const error: any = new Error("Webinar doesn't exist");
        error.status = 404;
        return next(error);
    }
    
    await prisma.webinar.delete({
        where:{id}
    })

    res.status(200).json({
        message: 'Webinar deleted successfully'
    })
    
});

const editCaseStudy = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { title, project_scope, project_deliverables, customer, key_tools } = req.body;
    const { id } = req.params;

    const caseStudyFound = await prisma.caseStudy.findFirst({
        where: { id }
    });

    if (!caseStudyFound) {
        const error: any = new Error("Case study doesn't exist");
        error.status = 404;
        return next(error);
    }

    const file = req.files?.img;

    try {
        if (file) {
            const filename = Date.now() + "__" + file.name;
            const filepath = path.join(__dirname, `../../public/images/case-studies/${filename}`);

            await fs.promises.copyFile(file.path, filepath);

            if (caseStudyFound.img) {
                fs.rmSync(path.join(__dirname, `../../public/images/case-studies/${caseStudyFound.img.split("/")[caseStudyFound.img.split("/").length - 1]}`));
            }

            await prisma.caseStudy.update({
                where: { id },
                data: {
                    img: `${process.env.BACKEND_SITE_URL}/images/case-studies/${filename}`,
                    title,
                    project_scope,
                    project_deliverables,
                    customer,
                    key_tools
                }
            });
        } else {
            // If no new image is provided, just update the other fields
            await prisma.caseStudy.update({
                where: { id },
                data: {
                    title,
                    project_scope,
                    project_deliverables,
                    customer,
                    key_tools
                }
            });
        }

        res.status(200).json({
            message: "Case study edited successfully"
        });
    } catch (error) {
        console.error(error);
        const err: any = new Error('Error processing request');
        err.status = 500;
        return next(err);
    }
});

export { addWhitePaper, addNews, addWebinar, addBlog, addCaseStudy, editWhitePaper, editBlog, editWebinar, editNews, editCaseStudy }