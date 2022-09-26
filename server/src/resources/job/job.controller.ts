import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resource/job/job.validation';
import JobService from '@/resource/job/job.service';

class JobController implements Controller {
  public path = '/jobs';
  public router = Router();
  
  private jobService = new JobService();
  constructor() {
    this.intialiseRoutes();
  }

  private intialiseRoutes(): void {
    this.router.post(
      `${this.path}`,
      validationMiddleware(validate.create),
      this.create
    );

    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(validate.update),
      this.update
    );

    this.router.get(`${this.path}/all`, this.getAllJobs);
    this.router.get(`${this.path}/:id`, this.getJobById);
    this.router.delete(`${this.path}/:id`, this.deleteJob)
  }

  private create = async(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const {name, status, title, phone, email, note} = req.body;
      const job = await this.jobService.create(name, status, title, phone, email, note);
      res.status(201).json({job});
    } catch (e: any) {
      next(new HttpException(400, e.message));
    }
  }

  private update = async(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise <Response|void> => {
    try {
      const { id } = req.params;
      const {name, status, title, phone, email, note} = req.body;
      const job = await this.jobService.update(id, name, status, title, phone, email, note);
      res.status(200).json({job});
    }catch (e: any) {
      next( new HttpException(404, e.message))
    }
  }

  private getAllJobs = async(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise <Response|void> => {
    try {
      const job = await this.jobService.getAllJobs();
      res.status(200).json({job});
    }catch (e: any) {
      next( new HttpException(404, e.message))
    }
  }
  
  private getJobById = async(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise <Response|void> => {
    try {
      const { id } = req.params;
      const job = await this.jobService.findById(id);
      res.status(200).json({job});
    }catch (e: any) {
      next( new HttpException(404, e.message))
    }
  }

  private deleteJob = async(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise <Response|void> => {
    try {
      const { id } = req.params;
      const job = await this.jobService.delete(id);
      res.status(200).json({message: "The job has been deleted."});
    }catch (e: any) {
      next( new HttpException(404, e.message))
    }
  }
}

export default JobController;